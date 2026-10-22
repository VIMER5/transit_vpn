import $api from "@/app/api/axios";
import type { DataPricing } from "@/app/types/plans.types";

export function PlansAPI() {
  async function getPricing(): Promise<DataPricing | null> {
    const { data } = await $api.get<DataPricing>("/plans/pricing");
    return data;
  }
  return { getPricing };
}
