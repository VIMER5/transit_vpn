import { AppError } from "./app.error.js";

class SubError {
  static BadRequestResolvePrice() {
    return new AppError("sub_BadRequest", 400, "Требуется либо planId, либо custom параметры");
  }
}

export default SubError;
