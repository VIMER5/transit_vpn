import { AppError } from "./app.error.js";

class userError {
  static userNotFound() {
    return new AppError("user_getUser", 404, "Пользователь не найден");
  }
  static userBanned() {
    return new AppError("user_isBanned", 403, "Пользователь заблокирован");
  }
}

export default userError;
