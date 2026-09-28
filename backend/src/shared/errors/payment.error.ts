import { AppError } from "./app.error.js";

class PaymentError {
  static InsufficientBalanceError() {
    return new AppError("Payment_InsufficientBalanceError", 402, "Недостаточно средств");
  }
}

export default PaymentError;
