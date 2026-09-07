import { AppError } from "./app.error.js";

class authError {
  static initDataInvalid() {
    return new AppError("auth_initDataInvalid", 401, "данные инициализации неверны");
  }

  static initDataExpired() {
    return new AppError("auth_initDataExpired", 401, "срок действия данных для инициализации истек");
  }
  static guardTokenNotFound() {
    return new AppError("guard_tokenNotFound", 401, "нет токена");
  }
  static guardTokenIsInvalid() {
    return new AppError("guard_tokenIsInvalid", 401, "токен недействителен");
  }
}

export default authError;
