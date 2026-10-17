export interface NodeSummary {
  name: string;
  status: string;
  ip: string;
  port: number;
  xrayVersion: string;
}
export interface inboundsSummary {
  id: number;
  remark: string;
  enable: boolean;
}
export interface userInfo {
  id: number;
  email: string;
  subId: string;
  uuid: string;
  flow: string;
  expiryTime: number;
  enable: boolean;
  usedTraffic: number;
  inboundIds: number[];
}
