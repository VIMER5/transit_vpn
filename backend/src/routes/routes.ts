import express, { Request, Response } from "express";
import api from "./api.js";
import subscriptionsController from "../modules/subscriptions/subscriptions.controller.js";
import validation from "../middleware/validation.middleware.js";
import { ParamsUUIDSchema } from "../modules/subscriptions/subscriptions.validator.js";
import { sendBrowserNotFound } from "../shared/pages/notFound.js";

const router = express.Router();

router.use("/api", api);
router.get("/:sub_uuid", validation(ParamsUUIDSchema, "params", true), subscriptionsController.returnSubByUUID);
router.use("/", (req: Request, res: Response) => sendBrowserNotFound(res));
export default router;
