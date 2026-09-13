import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { useAuthStore } from "@/app/stores/auth.store";
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

export default $api;
