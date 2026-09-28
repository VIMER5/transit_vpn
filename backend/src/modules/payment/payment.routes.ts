import express from "express";
import paymentController from "./payment.controller.js";
import validation from "../../middleware/validation.middleware.js";
import { historyRequestSchema } from "./payment.validator.js";

const paymentAPI = express.Router();

paymentAPI.post("/", paymentController.test);
paymentAPI.post("/history", validation(historyRequestSchema), paymentController.history);

export default paymentAPI;
