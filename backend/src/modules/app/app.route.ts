import express from "express";
import appController from "./app.controller.js";

const appRoute = express.Router();

appRoute.get("/payload", appController.appPayLoad);

export default appRoute;
