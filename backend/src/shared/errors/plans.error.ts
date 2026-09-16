import { AppError } from "./app.error.js";

class PlansError {
  static BadRequest() {
    return new AppError("plans_BadRequest", 400, "BadRequest");
  }
  static NotFound() {
    return new AppError("plans_NotFound", 404, "NotFound");
  }
}

export default PlansError;
