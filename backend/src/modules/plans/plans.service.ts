import { plans } from "../../infrastructure/database/models/plans.model.js";
import { pricingConfig } from "../../infrastructure/database/models/pricingConfig.model.js";
import { subPeriods } from "../../infrastructure/database/models/subPeriods.model.js";
import PlansError from "../../shared/errors/plans.error.js";
import { TxOptions } from "../../shared/types/global.type.js";

class PlansService {
  async getPeriods(options?: TxOptions) {
    const t = options?.transaction;
    const data = await subPeriods.findAll({
      where: { is_active: true },
      order: [["months", "ASC"]],
      transaction: t,
    });
    return data;
  }
  async getPricing(options?: TxOptions) {
    const t = options?.transaction;
    const data = await pricingConfig.findOne({
      where: { id: 1 },
      attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      transaction: t,
    });
    if (!data) throw PlansError.NotFound();
    return data;
  }
}

export default new PlansService();
