interface PurchaseInput {
  userID: bigint;
  planId?: number;
  custom?: {
    deviceCount: number;
    durationMonths: number;
  };
}

interface clientType {
  isVpnClient: boolean;
  agent: clientAgent;
  deviceName: string | null;
  os: string | null;
  hwid: string | null;
}

type clientAgent = "INCY" | "Happ" | "browser";

export { PurchaseInput, clientType, clientAgent };
