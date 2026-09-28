import express from "express";
import userRoutes from "../modules/users/users.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import { guardRest } from "../middleware/guard.middleware.js";
import plansRoutes from "../modules/plans/plans.routes.js";
import subscriptionsApi from "../modules/subscriptions/subscriptions.routes.js";
import paymentAPI from "../modules/payment/payment.routes.js";

const api = express.Router();

api.use("/auth", authRoutes);
api.use("/users", guardRest, userRoutes);
api.use("/plans", guardRest, plansRoutes);
api.use("/sub", guardRest, subscriptionsApi);
api.use("/payment", guardRest, paymentAPI);

export default api;
