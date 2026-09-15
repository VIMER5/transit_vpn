import express from "express";
import userRoutes from "../modules/users/users.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import { guardRest } from "../middleware/guard.middleware.js";
import plansRoutes from "../modules/plans/plans.routes.js";

const api = express.Router();

api.use("/auth", authRoutes);
api.use("/users", guardRest, userRoutes);
api.use("/plans", guardRest, plansRoutes);

export default api;
