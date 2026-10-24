import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { DataPricing } from "../types/plans.types";
import { PlansAPI } from "../api/plans.api";
import type { appPayLoad } from "../types/global.types";
import $api from "../api/axios";

const { getPricing } = PlansAPI();

export const useAppStore = defineStore("AppStore", () => {
  const pricing = ref<DataPricing | null>(null);
  const PayLoad = ref<appPayLoad>();
  const pricingLoading = ref(false);

  async function fetchPayLoad() {
    const { data } = await $api.get<appPayLoad>("/app/PayLoad");
    PayLoad.value = data;
  }

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
      await fetchPayLoad();
      await fetchPricing();
    } catch (e) {
      throw new Error("Ошибка инициализации AppStore", {
        cause: e,
      });
    }
  }
  return { pricing, PayLoad, initAppStore, fetchPricing };
});
