import crypto from "crypto";
import authError from "./auth.errors.js";

const { botTgToken } = process.env;

class authService {
  async authTelegram(initData: string) {
    const params = new URLSearchParams(initData);
    const receivedHash = params.get("hash");
    params.delete("hash");
    const dataCheckArr = [];
    for (const [key, value] of params.entries()) dataCheckArr.push(`${key}=${value}`);
    dataCheckArr.sort();
    const dataCheckString = dataCheckArr.join("\n");

    const secretKey = crypto.createHmac("sha256", "WebAppData").update(botTgToken!).digest();
    const calculatedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

    if (calculatedHash != receivedHash) {
      throw authError.initDataInvalid();
    }

    const authDate = parseInt(params.get("auth_date")!, 10);
    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > 60) {
      throw authError.initDataExpired();
    }

    return "JWT";
  }
}

export default new authService();
