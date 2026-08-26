import { NextFunction, Request, Response } from "express";
import authService from "./auth.service.js";

class authController {
  async authTelegramMiniApp(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body.initData);
      const datad = await authService.authTelegram(req.body.initData);
      res.status(200).json({ data: datad });
    } catch (e) {
      next(e);
    }
  }
}

export default new authController();
