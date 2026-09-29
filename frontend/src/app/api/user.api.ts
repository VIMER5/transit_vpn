import $api from "@/app/api/axios";
import type { UserReferralStatistics } from "../types/user.types";

export function UserAPI() {
  async function getUserReferralStatistics(): Promise<UserReferralStatistics | null> {
    try {
      const { data } = await $api.get<UserReferralStatistics>("/users/referral_statistics");
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  return { getUserReferralStatistics };
}
