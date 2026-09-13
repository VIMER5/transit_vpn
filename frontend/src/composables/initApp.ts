import { ref } from "vue";
import { useTelegram } from "./useTelegram";
import { useAuthStore } from "@/app/stores/auth.store";
import { AxiosError } from "axios";
import { useUserStore } from "@/app/stores/user.store";
const { VITE_INIT_DATA, VITE_NODE_ENV } = import.meta.env;

export function initApp() {
  const status = ref<"loading" | "ready" | "error">("loading");
  const errorMessage = ref("");
  async function run() {
    status.value = "loading";
    errorMessage.value = "";
    try {
      const { initData } = useTelegram();
      const authStore = useAuthStore();
      await authStore.login(VITE_NODE_ENV == "dev" ? VITE_INIT_DATA : initData);

      const userStore = useUserStore();

      await Promise.all([userStore.fetch()]);

      status.value = "ready";
    } catch (e) {
      console.error("ошибка initApp:", e);
      errorMessage.value = getErrorMessage(e);
      status.value = "error";
    }
  }
  return { run, status, errorMessage };
  function getErrorMessage(e: any): string {
    if (e instanceof AxiosError && e.response) {
      if (e.response.status == 400) return "Попробуйте снова или перезагрузите приложение";
      if (e.response.status == 401 && e.response.data.error) return e.response.data.error.message;
    }
    return "Что-то пошло не так. Попробуйте ещё раз.";
  }
}
