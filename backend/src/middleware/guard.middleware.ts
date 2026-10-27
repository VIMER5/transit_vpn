import { NextFunction, Request, Response } from "express";
import authError from "../shared/errors/auth.errors.js";
import tokenService from "../modules/auth/token.service.js";
import { CustomRequest } from "../shared/types/customRequest.type.js";
import userError from "../shared/errors/user.error.js";
import { User } from "../infrastructure/database/models/user.model.js";

export async function guardRest(req: CustomRequest, res: Response, next: NextFunction) {
  const { authorization = null } = req.headers;
  if (!authorization || typeof authorization != "string" || !authorization.includes("Bearer"))
    return next(authError.guardTokenNotFound());
  const access = authorization.split(" ")[1];
  const payload = await tokenService.isValidAccessToken(access);
  if (typeof payload == "boolean") return next(authError.guardTokenIsInvalid());
  req.userId = payload.id;
  next();
}

export async function isUserBanned(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) throw userError.userNotFound();
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "status"],
    });
    if (!user) throw userError.userNotFound();
    if (user.status == "banned") throw userError.userBanned();
    next();
  } catch (e) {
    next(e);
  }
}
