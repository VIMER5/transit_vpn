import { plans } from "../../infrastructure/database/models/plans.model.js";
import { pricingConfig } from "../../infrastructure/database/models/pricingConfig.model.js";
import PlansError from "../../shared/errors/plans.error.js";

class PlansService {
  async getPublicTariffPlans() {
    const data = await plans.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { active: true },
      order: [["price_kopecks", "ASC"]],
    });
    return data;
  }
  async getPublicTariffPlansByID(id: number, isActive: boolean = true) {
    const data = await plans.findOne({
      where: { id, active: isActive },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!data) throw PlansError.NotFound();
    return data;
  }
  async getPricing() {
    const data = await pricingConfig.findOne({
      where: { id: 1 },
      attributes: { exclude: ["createdAt", "updatedAt", "id"] },
    });
    return data;
  }
}

export default new PlansService();
