import express from "express";
import validation from "../../middleware/validation.middleware.js";
import { purchaseRequestSchema } from "./subscriptions.validator.js";
import subController from "./subscriptions.controller.js";
import { requireSub } from "../../middleware/requireSub.middleware.js";
const subscriptionsApi = express.Router();

subscriptionsApi.get("/", requireSub, subController.getUserCurrentSub);

subscriptionsApi.post("/purchase", validation(purchaseRequestSchema), subController.purchase);
subscriptionsApi.patch("/rotateSubUuid", requireSub, subController.rotateUserUuidSub);
subscriptionsApi.get("/trials", subController.trials);

export default subscriptionsApi;
