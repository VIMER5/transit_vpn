import { CustomRequest } from "../../shared/types/customRequest.type.js";
import { Response, NextFunction } from "express";
import plansService from "./plans.service.js";
import PlansError from "../../shared/errors/plans.error.js";
class plansControllers {
  async getPublicTariffPlans(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await plansService.getPublicTariffPlans();
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async getPublicTariffPlansByID(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id = null } = req.params;
      if (!id || isNaN(Number(id))) throw PlansError.BadRequest();
      const data = await plansService.getPublicTariffPlansByID(Number(id));
      if (!data) throw PlansError.NotFound();
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async getPricing(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await plansService.getPricing();
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new plansControllers();
