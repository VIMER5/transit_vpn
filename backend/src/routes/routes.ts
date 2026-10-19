import express, { Request, Response } from "express";
import api from "./api.js";
import validation from "../middleware/validation.middleware.js";
import { ParamsUUIDSchema } from "../modules/subscriptions/subscriptions.validator.js";
import { sendBrowserNotFound } from "../shared/pages/notFound.js";
import clientController from "../modules/client/client.controller.js";

const router = express.Router();

router.use("/api", api);
router.get("/:sub_uuid", validation(ParamsUUIDSchema, "params", true), clientController.returnSubByUUID);
router.use("/", (req: Request, res: Response) => sendBrowserNotFound(res));
export default router;
