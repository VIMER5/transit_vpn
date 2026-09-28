import SubError from "../../shared/errors/sub.error.js";
import { PurchaseInput } from "../../shared/types/subscriptions.type.js";
import plansService from "../plans/plans.service.js";

class subService {
  async purchaseSubscription(input: PurchaseInput) {
    return await this.resolvePrice(input);
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
