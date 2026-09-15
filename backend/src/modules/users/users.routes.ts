import express, { NextFunction, Request, Response } from "express";
import userController from "./user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", userController.getUserInfo);

export default userRoutes;
