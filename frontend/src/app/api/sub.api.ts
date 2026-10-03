import type { InfoCurrentUserSubResponse } from "../types/sub.types";
import $api from "./axios";

export default function SubApi() {
  async function getSubInfoCurrentUser(): Promise<InfoCurrentUserSubResponse | null> {
    try {
      const { data } = await $api.get<InfoCurrentUserSubResponse>("/sub");
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  return { getSubInfoCurrentUser };
}
