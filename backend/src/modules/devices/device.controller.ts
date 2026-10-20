import { CustomRequest } from "../../shared/types/customRequest.type.js";
import { Response, NextFunction } from "express";
import devicesService from "./devices.service.js";

class deviceController {
  async getDevices(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await devicesService.getDevicesByUserID(req.userId!);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async getDeviceLimits(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await devicesService.getDeviceLimitsByUserID(req.userId!);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async userDeleteDevice(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await devicesService.delDevice(req.userId!, req.body.deviceId);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new deviceController();
