import { CustomRequest } from "../../shared/types/customRequest.type.js";
import { Response, NextFunction } from "express";
import plansService from "./plans.service.js";
import PlansError from "../../shared/errors/plans.error.js";
class plansControllers {
  async getPeriods(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await plansService.getPeriods();
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
