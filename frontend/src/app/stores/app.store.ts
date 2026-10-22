import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { DataPricing } from "../types/plans.types";
import { PlansAPI } from "../api/plans.api";

const { getPricing } = PlansAPI();

export const useAppStore = defineStore("AppStore", () => {
  const pricing = ref<DataPricing | null>(null);
  const pricingLoading = ref(false);

  async function fetchPricing() {
    if (pricingLoading.value) return;
    pricingLoading.value = true;
    try {
      pricing.value = await getPricing();
    } finally {
      pricingLoading.value = false;
    }
  }

  async function initAppStore() {
    try {
      await fetchPricing();
    } catch (e) {
      throw new Error("Ошибка инициализации AppStore", {
        cause: e,
      });
    }
  }
  return { pricing, initAppStore, fetchPricing };
});
