import { AppError } from "./app.error.js";

class DeviceError {
  static DeviceNotFound() {
    return new AppError("device_NotFound", 404, "нет такого устройства");
  }
  static DeviceForbidden() {
    return new AppError("device_Forbidden", 403, "У вас нет прав на это");
  }
}

export default DeviceError;
