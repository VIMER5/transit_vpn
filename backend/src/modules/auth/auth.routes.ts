import express from "express";
import authController from "./auth.controller.js";
import validation from "../../middleware/validation.middleware.js";
import { authRequestSchema } from "./auth.validator.js";

const authRoutes = express.Router();

authRoutes.post("/miniapp", validation(authRequestSchema), authController.authTelegramMiniApp);

export default authRoutes;
