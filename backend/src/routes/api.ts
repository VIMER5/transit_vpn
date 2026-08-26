import express from "express";
import userRoutes from "../modules/users/users.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";

const api = express.Router();

api.use("/auth", authRoutes);
api.use("/users", userRoutes);

export default api;
