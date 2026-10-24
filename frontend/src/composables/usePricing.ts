import type { DataPricing } from "@/app/types/plans.types";

export function usePricing() {
  function calculateSub(pricing: DataPricing, device: number, months: number, percent: number) {
    const total = pricing.cost_month_kopecks * months + pricing.device_month_rate_kopecks * device * months;
    return Math.round(total * (1 + percent / 100));
  }
  return { calculateSub };
}
