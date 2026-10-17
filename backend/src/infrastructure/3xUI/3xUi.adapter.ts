import axios, { AxiosError, AxiosInstance } from "axios";

class ThreeXUIAdapter {
  private $api: AxiosInstance;
  constructor(baseURL: string, token: string) {
    this.$api = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000,
    });
  }
  async fetchNodeList() {
    const response = await this.$api.get<responseServerThreeXUI>("/panel/api/nodes/list");
    return response.data;
  }
  async fetchClientsByEmail(email: string) {
    const response = await this.$api.get<responseServerThreeXUI>(`/panel/api/clients/get/${email}`);
    return response.data;
  }
  async fetchInboundsList() {
    const response = await this.$api.get<responseServerThreeXUI>(`/panel/api/inbounds/list`);
    return response.data;
  }
  async fetchAddClient(email: string, inboundIds: number[], clientData: Record<string, any> = {}) {
    const response = await this.$api.post<responseServerThreeXUI>(`/panel/api/clients/add`, {
      client: {
        email,
        enable: true,
        ...clientData,
      },
      inboundIds,
    });
    return response.data;
  }
  async fetchGetSubLinks(sibID: string) {
    const response = await this.$api.get<responseServerThreeXUI>(`/panel/api/clients/subLinks/${sibID}`);
    return response.data;
  }
}

interface responseServerThreeXUI {
  success: boolean;
  msg: string;
  obj: any;
}
export default ThreeXUIAdapter;
