import { subscriptions } from "../../infrastructure/database/models/subscriptions.model.js";
import { User } from "../../infrastructure/database/models/user.model.js";
import SubError from "../../shared/errors/sub.error.js";
import { PurchaseInput } from "../../shared/types/subscriptions.type.js";
import plansService from "../plans/plans.service.js";
import { db } from "../../infrastructure/database/index.js";
import paymentService from "../payment/payment.service.js";
import userError from "../../shared/errors/user.error.js";

class subService {
  async purchaseSubscription(input: PurchaseInput) {
    return db.transaction(async (t) => {
      const userAndSubInfo = await User.findByPk(input.userID, {
        attributes: ["id", "balance", "sub_id"],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      if (!userAndSubInfo) throw new Error();

      const existing = await subscriptions.findByPk(userAndSubInfo.sub_id, { transaction: t });

      const newSubInfo = await this.resolvePrice(input);

      const newExpiresAt = new Date();
      newExpiresAt.setDate(newExpiresAt.getDate() + newSubInfo.durationDays);
      const subData = {
        plan_id: input.planId ?? null,
        plan_title: newSubInfo.planTitle,
        device_limit: newSubInfo.deviceLimit,
        price_paid_kopecks: newSubInfo.priceKopecks,
        expires_at: newExpiresAt,
        status: "active",
      };

      let subscription;
      if (existing) {
        subscription = await existing.update(subData, { transaction: t });
      } else {
        subscription = await subscriptions.create(subData, { transaction: t });
        await userAndSubInfo.update({ sub_id: subscription.id }, { transaction: t });
      }
      await paymentService.debitBalance(
        input.userID,
        newSubInfo.priceKopecks,
        {
          type: "purchase",
          referenceId: subscription.id,
        },
        { transaction: t },
      );
      return subscription;
    });
  }
  async getCurrentUserSub(userId: bigint) {
    const subUser = await User.findByPk(userId, {
      include: [
        {
          model: subscriptions,
          as: "Sub",
          attributes: { exclude: ["updatedAt", "createdAt", "price_paid_kopecks", "plan_id"] },
        },
      ],
      attributes: ["id"],
    });
    if (!subUser) throw userError.userNotFound();
    return subUser;
  }
  private async resolvePrice(input: PurchaseInput) {
    if (input.planId) {
      const plan = await plansService.getPublicTariffPlansByID(input.planId);
      return {
        planTitle: plan.title,
        deviceLimit: plan.device_limit,
        durationDays: plan.duration_months * 30,
        priceKopecks: plan.price_kopecks,
      };
    }
    throw SubError.BadRequestResolvePrice();
  }
}

export default new subService();
