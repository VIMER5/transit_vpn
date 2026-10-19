import { AppError } from "./app.error.js";

class SubError {
  static BadRequestResolvePrice() {
    return new AppError("sub_BadRequest", 400, "Требуется либо planId, либо custom параметры");
  }
  static subForbidden() {
    return new AppError("sub_Forbidden", 403, "У вас нет доступа к этой подписке");
  }
  static subNotFound() {
    return new AppError("sub_NotFound", 404, "У вас нет подписки");
  }
}

export default SubError;
