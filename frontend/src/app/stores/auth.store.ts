import { ref, computed } from "vue";
import { defineStore } from "pinia";
import $api from "@/app/api/axios";
export const useAuthStore = defineStore("AuthStore", () => {
  const token = ref<string>();

  async function login(initData: string) {
    const data = await $api.post("/auth/miniapp", {
      initData,
    });
    token.value = data.data.accessToken;
  }

  return { token, login };
});
