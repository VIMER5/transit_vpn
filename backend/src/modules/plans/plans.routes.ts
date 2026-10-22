import express from "express";
import plansController from "./plans.controller.js";

const plansRoutes = express.Router();

plansRoutes.get("/", plansController.getPeriods);
plansRoutes.get("/pricing", plansController.getPricing);
// plansRoutes.get("/:id", plansController.getPublicTariffPlansByID);

export default plansRoutes;
