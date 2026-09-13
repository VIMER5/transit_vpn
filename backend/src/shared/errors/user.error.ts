import { AppError } from "./app.error.js";

class userError {
  static userNotFound() {
    return new AppError("user_getUser", 404, "Пользователь не найден");
  }
}

export default userError;
