import { NextFunction, Response } from "express";
import { CustomRequest } from "../shared/types/customRequest.type.js";
import { User } from "../infrastructure/database/models/user.model.js";
import { subscriptions } from "../infrastructure/database/models/subscriptions.model.js";
import userError from "../shared/errors/user.error.js";
import SubError from "../shared/errors/sub.error.js";

export async function requireSub(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const user = await User.findByPk(req.userId!, {
      attributes: ["id"],
      include: [{ model: subscriptions, as: "Sub", attributes: ["id"] }],
    });
    if (!user) throw userError.userNotFound();
    const sub = user.Sub;
    if (!sub) throw SubError.subNotFound();
    req.subId = sub.id;
    next();
  } catch (e) {
    next(e);
  }
}
