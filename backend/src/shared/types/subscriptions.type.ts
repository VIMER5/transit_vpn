interface PurchaseInput {
  userID: bigint;
  planId?: number;
  custom?: {
    deviceCount: number;
    durationMonths: number;
  };
}

export { PurchaseInput };
