import crypto from "crypto";
import authError from "../../shared/errors/auth.errors.js";
import { UserInfoInInitData } from "../../shared/types/user.types.js";
import userService from "../users/user.service.js";
import { token } from "../../shared/types/token.types.js";
import tokenService from "./token.service.js";
import { config } from "../../config.js";

class authService {
  async authTelegram(initData: string): Promise<token> {
    const UserInfo = this.authenticationInitData(initData);
    const data = await this.updateInfo(UserInfo);
    const token: token = await tokenService.createdToken({ id: data.id });
    return token;
  }

  private async updateInfo(UserInfo: UserInfoInInitData) {
    let data = await userService.userFindByTgID(UserInfo.tg_id);
    if (!data) return await userService.userСreating(UserInfo);
    return await data.update({ ...UserInfo });
  }
  private authenticationInitData(initData: string): UserInfoInInitData {
    const params = new URLSearchParams(initData);
    const receivedHash = params.get("hash");
    params.delete("hash");
    const dataCheckArr = [];
    for (const [key, value] of params.entries()) dataCheckArr.push(`${key}=${value}`);
    dataCheckArr.sort();
    const dataCheckString = dataCheckArr.join("\n");

    const secretKey = crypto.createHmac("sha256", "WebAppData").update(config.tg.botToken).digest();
    const calculatedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

    if (calculatedHash != receivedHash) {
      throw authError.initDataInvalid();
    }
    const user = JSON.parse(params.get("user")!);
    const userData: UserInfoInInitData = {
      tg_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      photo_url: user.photo_url,
    };
    const authDate = parseInt(params.get("auth_date")!, 10);
    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > 60 && config.isProd) {
      throw authError.initDataExpired();
    }
    return userData;
  }
}

export default new authService();
