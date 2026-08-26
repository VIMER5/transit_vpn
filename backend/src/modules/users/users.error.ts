import { AppError } from "../../shared/errors/app.error.js";

class UsersError {
  userNotFound() {
    return new AppError("UsersError_userNotFound", 404, "userNotFound");
  }
}

export default new UsersError();
