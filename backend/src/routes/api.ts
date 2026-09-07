import express from "express";
import userRoutes from "../modules/users/users.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import { guardRest } from "../middleware/guard.middleware.js";

const api = express.Router();

api.use("/auth", authRoutes);
api.use("/users", guardRest, userRoutes);

export default api;
