export interface UserProfile {
  id: string;
  tg_id: string;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  referral_code: string;
  referred_by_id: number | null;
  status: "active" | "banned";
  balance: number;
  updatedAt: string;
}

export interface UserReferralStatistics {
  referral_code: string;
  referralsCount: number;
  sumReferralsBonus: number;
  url: string;
}
