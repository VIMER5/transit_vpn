export interface DataPlans {
  id: number;
  title: string;
  price_kopecks: number;
  duration_months: number;
  device_limit: number;
  accent: boolean;
}
export interface DataPricing {
  device_month_rate_kopecks: number;
  cost_month_kopecks: number;
  max_month: number;
  max_device: number;
  SubPeriod: SubPeriod[];
}

export interface SubPeriod {
  id: number;
  months: number;
  discount_percent: number;
  is_active: boolean;
}
