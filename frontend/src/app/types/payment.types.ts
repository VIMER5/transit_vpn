export interface paymentInfo {
  amount_kopecks: number;
  type: TypesBalanceTransaction;
  reference_id: number;
  balance_after: number;
  note: string | null;
  createdAt: string;
}

export type TypesBalanceTransaction =
  | "topup"
  | "purchase"
  | "sub_update"
  | "referral_bonus"
  | "refund"
  | "admin_adjustment";
