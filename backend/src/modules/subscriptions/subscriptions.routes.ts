import express from "express";
import validation from "../../middleware/validation.middleware.js";
import { purchaseRequestSchema } from "./subscriptions.validator.js";
import subController from "./subscriptions.controller.js";
const subscriptionsApi = express.Router();

subscriptionsApi.post("/purchase", validation(purchaseRequestSchema), subController.purchase);

export default subscriptionsApi;
