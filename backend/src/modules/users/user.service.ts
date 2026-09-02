import { User } from "../../infrastructure/database/models/user.model.js";
import { UserInfoInInitData } from "../../shared/types/user.types.js";
import crypto from "crypto";

class UserService {
  async userFindByTgID(userTgID: number) {
    return await User.findOne({ where: { tg_id: userTgID } });
  }
  async userСreating(UserData: UserInfoInInitData): Promise<User> {
    const user = await this.userFindByTgID(UserData.tg_id);
    if (user) return user;
    const newUser = await User.create({ ...UserData, referral_code: await this.CreateReferralCode() });
    return newUser;
  }
  private async CreateReferralCode(length = 10): Promise<string> {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    const bytes = crypto.randomBytes(length);
    for (const byte of bytes) {
      result += alphabet[byte % alphabet.length];
    }
    const temp = await User.findOne({ where: { referral_code: result } });
    if (temp) return this.CreateReferralCode();
    return result;
  }
}

export default new UserService();

//5U+qhGU9xm3U5tfX
//j3hocuXgYmMBr1z6
//JbVZGOzsO+6D+O1/
//eunvAbfsKVvIGxrT
//KmERZhWxNc
//kdyyUBLKac
//8394f8bae55c426e5ed0a448
//847106e1c5881f174714e48e
