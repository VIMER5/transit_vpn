import { CustomRequest } from "../../shared/types/customRequest.type.js";
import { Response, NextFunction } from "express";
import userService from "./user.service.js";
import userError from "../../shared/errors/user.error.js";
class UserController {
  async getUserInfo(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await userService.getUserByID(req.userId!);
      if (!data) throw userError.userNotFound();
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
