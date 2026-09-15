import { CustomRequest } from "../../shared/types/customRequest.type.js";
import { Response, NextFunction } from "express";
import plansService from "./plans.service.js";
class plansControllers {
  async getPublicTariffPlans(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await plansService.getPublicTariffPlans();
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
