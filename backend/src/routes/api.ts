import express from "express";
import userRoutes from "../modules/users/users.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import { guardRest, isUserBanned } from "../middleware/guard.middleware.js";
import plansRoutes from "../modules/plans/plans.routes.js";
import subscriptionsApi from "../modules/subscriptions/subscriptions.routes.js";
import paymentAPI from "../modules/payment/payment.routes.js";
import deviceApi from "../modules/devices/device.routes.js";
import appRoute from "../modules/app/app.route.js";

const api = express.Router();

api.use("/auth", authRoutes);
api.use("/app", appRoute);
api.use("/users", guardRest, isUserBanned, userRoutes);
api.use("/plans", guardRest, plansRoutes);
api.use("/sub/device", guardRest, isUserBanned, deviceApi);
api.use("/sub", guardRest, isUserBanned, subscriptionsApi);
api.use("/payment", guardRest, isUserBanned, paymentAPI);

export default api;
