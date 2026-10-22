interface PurchaseInput {
  userID: bigint;
  custom: {
    deviceCount: number;
    periodId: number;
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
