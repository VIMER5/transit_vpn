import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
const { VITE_BASE_URL_SERVER } = import.meta.env;
const $api = axios.create({
  withCredentials: true,
  baseURL: VITE_BASE_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

export default $api;
