import express from "express";
import validation from "../../middleware/validation.middleware.js";
import deviceController from "./device.controller.js";

const deviceApi = express.Router();

deviceApi.get("/", deviceController.getDevices);
deviceApi.get("/limits", deviceController.getDeviceLimits);

export default deviceApi;
