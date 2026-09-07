import { NextFunction, Request, Response } from "express";
import authError from "../shared/errors/auth.errors.js";
import tokenService from "../modules/auth/token.service.js";
import { CustomRequest } from "../shared/types/customRequest.type.js";

export async function guardRest(req: CustomRequest, res: Response, next: NextFunction) {
  const { auth = null } = req.headers;
  if (!auth || typeof auth != "string" || !auth.includes("Bearer")) return next(authError.guardTokenNotFound());
  const access = auth.split(" ")[1];
  const payload = await tokenService.isValidAccessToken(access);
  if (typeof payload == "boolean") return next(authError.guardTokenIsInvalid());
  req.userId = payload.id;
  next();
}
