import express, { RequestHandler, type Router } from "express";
import validation from "../../middleware/validation.middleware.js";
import { purchaseRequestSchema, quoteQueryParams, upgradeSchema } from "./subscriptions.validator.js";
import subController from "./subscriptions.controller.js";
import { requireSub } from "../../middleware/requireSub.middleware.js";

const subscriptionsApi = express.Router();

subscriptionsApi.get("/", requireSub, subController.getUserCurrentSub);
subscriptionsApi.post("/purchase", validation(purchaseRequestSchema), subController.purchase);
subscriptionsApi.patch("/rotateSubUuid", requireSub, subController.rotateUserUuidSub);
subscriptionsApi.patch("/upgrade", requireSub, validation(upgradeSchema), subController.upgrade);
subscriptionsApi.get("/upgrade/quote", requireSub, validation(quoteQueryParams, "query"), subController.quote);
subscriptionsApi.get("/trials", subController.trials);

export default subscriptionsApi;
