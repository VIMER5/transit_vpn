import { NextFunction, Request, Response } from "express";
import appService from "./app.service.js";

class appController {
  async appPayLoad(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await appService.PayLoad();
      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new appController();
