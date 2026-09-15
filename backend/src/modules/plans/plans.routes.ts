import express from "express";
import plansController from "./plans.controller.js";

const plansRoutes = express.Router();

plansRoutes.get("/", plansController.getPublicTariffPlans);
plansRoutes.get("/pricing", plansController.getPricing);

export default plansRoutes;
