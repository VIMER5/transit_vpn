import { AppError } from "./app.error.js";

class SubError {
  static BadRequestResolvePrice() {
    return new AppError("sub_BadRequest", 400, "Требуется либо planId, либо custom параметры");
  }
  static subForbidden() {
    return new AppError("sub_Forbidden", 403, "У вас нет доступа к этой подписке");
  }
  static subNotFound() {
    return new AppError("sub_NotFound", 404, "Подписка не найдена");
  }
  static nothingToUpgrade() {
    return new AppError("sub_NothingToUpgrade", 409, "Число устройств не изменилось");
  }
  static deviceLimitExceeded() {
    return new AppError("sub_DeviceLimitExceeded", 400, "Превышен лимит устройства");
  }
  static notActive() {
    return new AppError("sub_NotActive", 403, "Подписка не активна");
  }
  static priceChanged() {
    return new AppError("sub_priceChanged", 409, "Цена поменялась");
  }
}

export default SubError;
