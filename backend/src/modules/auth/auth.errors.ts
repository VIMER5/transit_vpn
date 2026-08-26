import { AppError } from "../../shared/errors/app.error.js";

class authError {
  static initDataInvalid() {
    return new AppError("auth_initDataInvalid", 401, "данные инициализации неверны");
  }

  static initDataExpired() {
    return new AppError("auth_initDataExpired", 401, "срок действия данных для инициализации истек");
  }
}

export default authError;
