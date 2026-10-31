import $api from "@/app/api/axios";
import type { paymentInfo } from "../types/payment.types";

export function paymentAPI() {
  async function getUserPaymentHistory(offset: number, limit: number): Promise<paymentInfo[] | null> {
    try {
      const { data } = await $api.post<paymentInfo[]>("/payment/history", {
        offset,
        limit,
      });
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  return { getUserPaymentHistory };
}
