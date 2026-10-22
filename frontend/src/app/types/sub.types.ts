export interface InfoCurrentUserSubResponse {
  id: bigint;
  Sub: subInfo;
}

export interface subInfo {
  id: number;
  sub_uuid: string;
  device_limit: number;
  price_paid_kopecks: number;
  discount: number;
  expires_at: string;
  status: "active" | "expired";
  createdAt: string;
  updatedAt: string;
}

export interface deviceLimits {
  deviceLimitSub: number;
  countDivice: number;
}

export interface deviceList {
  id: number;
  agent: "INCY" | "Happ";
  deviceName: string;
  os: string;
  createdAt: string;
}
