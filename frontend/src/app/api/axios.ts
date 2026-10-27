import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { useAuthStore } from "@/app/stores/auth.store";
import type { serverError } from "../types/global.types";
import { useUserStore } from "../stores/user.store";
const { VITE_BASE_URL_SERVER } = import.meta.env;

const $api = axios.create({
  // withCredentials: true,
  baseURL: VITE_BASE_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

$api.interceptors.request.use((conf) => {
  const authStore = useAuthStore();
  conf.headers.Authorization = `Bearer ${authStore.token}`;
  return conf;
});
$api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error) => {
    const userStore = useUserStore();
    if (
      error.response?.status === 403 &&
      error.response?.data.error &&
      error.response?.data.error.code === "user_isBanned"
    ) {
      userStore.isUserBanned = true;
    }

    return Promise.reject(error);
  },
);
export function isServerError(data: any): data is serverError {
  return data && typeof data === "object" && "message" in data && "code" in data;
}
export default $api;
