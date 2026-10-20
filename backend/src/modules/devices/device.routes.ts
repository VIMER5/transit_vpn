import express from "express";
import validation from "../../middleware/validation.middleware.js";
import deviceController from "./device.controller.js";
import { deauthorizeDeviceRequestSchema } from "./device.validator.js";

const deviceApi = express.Router();

deviceApi.get("/", deviceController.getDevices);
deviceApi.get("/limits", deviceController.getDeviceLimits);
deviceApi.delete("/deauthorize", validation(deauthorizeDeviceRequestSchema), deviceController.userDeleteDevice);

export default deviceApi;
