import { subscriptions } from "../../infrastructure/database/models/subscriptions.model.js";
import { User } from "../../infrastructure/database/models/user.model.js";
import SubError from "../../shared/errors/sub.error.js";
import { PurchaseInput } from "../../shared/types/subscriptions.type.js";
import { db } from "../../infrastructure/database/index.js";
import paymentService from "../payment/payment.service.js";
import userError from "../../shared/errors/user.error.js";
import { subPeriods } from "../../infrastructure/database/models/subPeriods.model.js";
import { pricingConfig } from "../../infrastructure/database/models/pricingConfig.model.js";
import PlansError from "../../shared/errors/plans.error.js";
import { subDevice } from "../../infrastructure/database/models/subDevice.model.js";
import { UniqueConstraintError } from "sequelize";
import { randomUUID } from "node:crypto";
import plansService from "../plans/plans.service.js";
const DAY_MS = 86_400_000;
class subService {
  async rotateSubUuid(subId: number): Promise<string> {
    const sub = await subscriptions.findByPk(subId);
    if (!sub) throw SubError.subNotFound();
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await sub.update({ sub_uuid: randomUUID() });
        return sub.sub_uuid;
      } catch (e) {
        if (!(e instanceof UniqueConstraintError)) throw e;
      }
    }
    throw new Error("Не удалось выпустить уникальный UUID");
  }
  async purchaseSubscription(input: PurchaseInput) {
    return db.transaction(async (t) => {
      const user = await User.findByPk(input.userID, {
        attributes: ["id", "balance", "sub_id"],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      if (!user) throw userError.userNotFound();

      const pricing = await pricingConfig.findOne({
        where: { id: 1 },
        attributes: { exclude: ["createdAt", "updatedAt", "id"] },
        transaction: t,
      });
      if (!pricing) throw PlansError.NotFound();
      const SubExisting = await subscriptions.findByPk(user.sub_id, { transaction: t });
      const discount = await subPeriods.findByPk(input.custom.periodId);
      if (!discount || !discount.is_active) throw PlansError.NotFound();
      const priceKopecks = this.calculateSub(
        {
          cost_month_kopecks: pricing.cost_month_kopecks,
          device_month_rate_kopecks: pricing.device_month_rate_kopecks,
        },
        input.custom.deviceCount,
        discount.months,
        discount.discount_percent,
      );
      const newExpiresAt = new Date();
      newExpiresAt.setDate(newExpiresAt.getDate() + discount.months * 30);

      const newSubInfo = {
        device_limit: input.custom.deviceCount,
        price_paid_kopecks: priceKopecks,
        discount: discount.discount_percent,
        expires_at: newExpiresAt,
        term_months: discount.months,
        status: "active",
        isTrials: false,
        expiry_handled_at: null,
        notified_3d_at: null,
      };

      let subscription;
      if (SubExisting) {
        subscription = await SubExisting.update(newSubInfo, { transaction: t });
        await subDevice.destroy({ where: { sub_id: SubExisting.id }, transaction: t });
      } else {
        subscription = await subscriptions.create(newSubInfo, { transaction: t });
        await user.update({ sub_id: subscription.id }, { transaction: t });
      }
      await paymentService.debitBalance(
        input.userID,
        newSubInfo.price_paid_kopecks,
        {
          type: "purchase",
          referenceId: subscription.id,
        },
        { transaction: t },
      );
      return subscription;
    });
  }
  async getSubById(subId: number) {
    const sub = await subscriptions.findByPk(subId, {
      attributes: { exclude: ["expiry_handled_at", "notified_3d_at"] },
    });
    if (!sub) throw SubError.subNotFound();
    return sub;
  }
  quoteDeviceUpgrade(sub: subscriptions, pricing: pricingConfig, newDeviceCount: number) {
    if (sub.device_limit === newDeviceCount) throw SubError.nothingToUpgrade();
    if (newDeviceCount > pricing.max_device) throw SubError.deviceLimitExceeded();
    const difference = newDeviceCount - sub.device_limit;
    const daysLeft = Math.ceil((sub.expires_at.getTime() - Date.now()) / DAY_MS);
    if (daysLeft <= 0) throw SubError.notActive();
    let priceKopecks = 0;
    if (difference > 0) priceKopecks = Math.round((pricing.device_month_rate_kopecks * difference * daysLeft) / 30);
    return {
      currentLimit: sub.device_limit,
      newLimit: newDeviceCount,
      differenceDevices: difference,
      daysLeft,
      priceKopecks,
    };
  }
  async userDeviceUpgrade(userId: bigint, deviceCount: number, maxPriceKopecks: number) {
    return db.transaction(async (t) => {
      const user = await User.findByPk(userId, {
        attributes: ["id", "balance", "sub_id"],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      if (!user?.sub_id) throw SubError.subNotFound();
      const sub = await subscriptions.findByPk(user.sub_id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!sub || sub.status !== "active" || sub.expires_at <= new Date()) throw SubError.notActive();
      const pricing = await plansService.getPricing({ transaction: t });
      if (!pricing) throw PlansError.NotFound();

      const q = this.quoteDeviceUpgrade(sub, pricing, deviceCount);

      if (q.priceKopecks > maxPriceKopecks) throw SubError.priceChanged();

      if (q.priceKopecks > 0) {
        await paymentService.debitBalance(
          userId,
          q.priceKopecks,
          { type: "sub_update", referenceId: sub.id },
          { transaction: t },
        );
      }
      await sub.update({ device_limit: deviceCount }, { transaction: t });

      return { sub, chargedKopecks: q.priceKopecks };
    });
  }
  async trials(userId: bigint) {
    return db.transaction(async (t) => {
      const user = await User.findByPk(userId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
        attributes: ["id", "trial_period", "sub_id"],
      });
      if (!user) throw userError.userNotFound();
      if (user.trial_period) throw SubError.subForbidden();

      const existing = await subscriptions.findByPk(user.sub_id, { transaction: t });
      const newExpiresAt = new Date();
      newExpiresAt.setDate(newExpiresAt.getDate() + 3);

      const subData = {
        device_limit: 1,
        price_paid_kopecks: 0,
        discount: 0,
        expires_at: newExpiresAt,
        isTrials: true,
        status: "active",
        expiry_handled_at: null,
        notified_3d_at: null,
      };
      let subscription;
      if (existing) {
        subscription = await existing.update(subData, { transaction: t });
        await subDevice.destroy({ where: { sub_id: subscription.id }, transaction: t });
      } else {
        subscription = await subscriptions.create(subData, { transaction: t });
      }
      await user.update({ sub_id: subscription.id, trial_period: true }, { transaction: t });
      return subscription;
    });
  }
  async getSubByUuid(uuid: string) {
    const data = await subscriptions.findOne({ where: { sub_uuid: uuid } });
    return data;
  }
  private calculateSub(
    pricing: { cost_month_kopecks: number; device_month_rate_kopecks: number },
    device: number,
    months: number,
    percent: number,
  ) {
    const total = pricing.cost_month_kopecks * months + pricing.device_month_rate_kopecks * device * months;
    return Math.round(total * (1 + percent / 100));
  }
  // private async resolvePrice(input: PurchaseInput) {
  //   if (input.planId) {
  //     const plan = await plansService.getPublicTariffPlansByID(input.planId);
  //     return {
  //       planTitle: plan.title,
  //       deviceLimit: plan.device_limit,
  //       durationDays: plan.duration_months * 30,
  //       priceKopecks: plan.price_kopecks,
  //     };
  //   }
  //   throw SubError.BadRequestResolvePrice();
  // }
}

export default new subService();
