import { plans } from "../../infrastructure/database/models/plans.model.js";
import { pricingConfig } from "../../infrastructure/database/models/pricingConfig.model.js";

class PlansService {
  async getPublicTariffPlans() {
    const data = await plans.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [["price_kopecks", "ASC"]],
    });
    return data;
  }
  async getPublicTariffPlansByID(id: number) {
    const data = await plans.findOne({
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
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
