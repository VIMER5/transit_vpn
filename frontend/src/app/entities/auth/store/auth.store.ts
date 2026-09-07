import { ref, computed } from "vue";
import { defineStore } from "pinia";
import $api from "@/app/api/axios";
import { useTelegram } from "@/shared/lib/telegram/useTelegram";
import { AxiosError } from "axios";
const { initData } = useTelegram();
export const useAuthStore = defineStore("AuthStore", () => {
  const token = ref();
  const isRedy = ref<boolean>(false);

  //   const doubleCount = computed(() => count.value * 2);
  async function login() {
    try {
      if (initData) {
        const data = await $api.post("/auth/miniapp", {
          initData,
        });
        isRedy.value = true;
        console.log(data);
      }
    } catch (e) {
      console.log("dd");
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
      }
    }
  }

  return { token, isRedy, login };
});
