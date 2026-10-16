export interface InfoCurrentUserSubResponse {
  id: bigint;
  Sub: subInfo;
}

export interface subInfo {
  id: number;
  sub_uuid: string;
  plan_title: string;
  device_limit: number;
  expires_at: string;
  status: "active" | "expired";
}

export interface fullSubInfo extends subInfo {
  plan_id: number | null;
  price_paid_kopecks: number;
  updatedAt: string;
  createdAt: string;
}
