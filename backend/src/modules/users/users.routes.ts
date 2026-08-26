import express, { NextFunction, Request, Response } from "express";
import UsersError from "./users.error.js";

const userRoutes = express.Router();

userRoutes.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    // throw UsersError.userNotFound();
  } catch (e) {
    next(e);
  }
});

export default userRoutes;
