import { plans } from "../../infrastructure/database/models/plans.model.js";
import { pricingConfig } from "../../infrastructure/database/models/pricingConfig.model.js";
import { subPeriods } from "../../infrastructure/database/models/subPeriods.model.js";
import PlansError from "../../shared/errors/plans.error.js";

class PlansService {
  async getPeriods() {
    const data = await subPeriods.findAll({
      where: { is_active: true },
      order: [["months", "ASC"]],
    });
    return data;
  }
  async getPricing() {
    const data = await pricingConfig.findOne({
      where: { id: 1 },
      attributes: { exclude: ["createdAt", "updatedAt", "id"] },
    });
    if (!data) return null;
    const result = data.get({ plain: true });

    const dataPeriods = await subPeriods.findAll({
      where: { is_active: true },
      order: [["months", "ASC"]],
    });
    return { ...result, SubPeriod: dataPeriods };
  }
}

export default new PlansService();
