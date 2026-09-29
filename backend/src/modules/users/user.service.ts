import { BalanceTransaction } from "../../infrastructure/database/models/balanceTransaction.model.js";
import { Setting } from "../../infrastructure/database/models/settings.model.js";
import { User } from "../../infrastructure/database/models/user.model.js";
import userError from "../../shared/errors/user.error.js";
import { UserInfoInInitData } from "../../shared/types/user.types.js";
import crypto from "crypto";

class UserService {
  async getUserByID(userId: bigint) {
    return await User.findByPk(userId, {
      attributes: { exclude: ["createdAt"] },
    });
  }

  async userFindByTgID(userTgID: bigint) {
    return await User.findOne({ where: { tg_id: userTgID } });
  }
  async userСreating(UserData: UserInfoInInitData): Promise<User> {
    const user = await this.userFindByTgID(UserData.tg_id);
    if (user) return user;
    const newUser = await User.create({ ...UserData, referral_code: await this.CreateReferralCode() });
    return newUser;
  }

  async createUser(tg_id: bigint, invited_by: bigint): Promise<User> {
    const user = await this.userFindByTgID(tg_id);
    if (user) return user;
    const newUser = await User.create({
      tg_id,
      referral_code: await this.CreateReferralCode(),
      referred_by_id: invited_by,
    });
    return newUser;
  }

  async getUserViaReferralCode(referral_code: string) {
    return await User.findOne({ where: { referral_code } });
  }

  async getUserReferralStatistics(userId: bigint) {
    const referral_codeD = await User.findByPk(userId, { attributes: ["referral_code"] });
    if (!referral_codeD) throw userError.userNotFound();
    const { referral_code } = referral_codeD.get({ plain: true });
    const referralsCount = await User.count({ where: { referred_by_id: userId } });
    const sumReferralsBonus = await BalanceTransaction.sum("amount_kopecks", {
      where: { user_id: userId, type: "referral_bonus" },
    });
    const useTgBot = await Setting.findByPk("useTgBot");
    return {
      referral_code,
      referralsCount,
      sumReferralsBonus: sumReferralsBonus ?? 0,
      url: `https://t.me/${useTgBot ? useTgBot.value : null}?start=ref_${referral_code}`,
    };
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
