import ThreeXUIAdapter from "../infrastructure/3xUI/3xUi.adapter.js";
import { inboundsSummary, NodeSummary, userInfo } from "../shared/types/panel.types.js";

type apiAdapters = ThreeXUIAdapter;

class panelRepository {
  private apiAdapter: apiAdapters;
  constructor(apiAdapter: apiAdapters) {
    this.apiAdapter = apiAdapter;
  }
  async getNodeList(): Promise<NodeSummary[]> {
    try {
      const response = await this.apiAdapter.fetchNodeList();
      if (!response.success || !Array.isArray(response.obj)) {
        return [];
      }
      const nodes: NodeSummary[] = response.obj.map((node: any) => ({
        name: node.name,
        status: node.status,
        ip: node.address,
        port: node.port,
        xrayVersion: node.xrayVersion,
      }));
      return nodes;
    } catch (e) {
      console.error("Ошибка репозитория [getNodeList]:", e);
      return [];
    }
  }

  async getUserByEmail(email: string): Promise<userInfo | null> {
    try {
      const response = await this.apiAdapter.fetchClientsByEmail(email);
      if (!response.success || !response.obj) return null;
      const data: userInfo = {
        id: response.obj.client.id,
        email: response.obj.client.email,
        subId: response.obj.client.subId,
        uuid: response.obj.client.uuid,
        flow: response.obj.client.flow,
        expiryTime: response.obj.client.expiryTime,
        enable: response.obj.client.enable,
        usedTraffic: response.obj.usedTraffic,
        inboundIds: response.obj.inboundIds,
      };
      return data;
    } catch (e) {
      console.error("Ошибка репозитория [getUserByEmail]:", e);
      return null;
    }
  }
  async getInboundsList(): Promise<inboundsSummary[]> {
    try {
      const response = await this.apiAdapter.fetchInboundsList();
      if (!response.success || !Array.isArray(response.obj)) return [];
      const inbounds: inboundsSummary[] = response.obj.map((inbound: any) => ({
        id: inbound.id,
        remark: inbound.remark,
        enable: inbound.enable,
      }));
      return inbounds;
    } catch (e) {
      console.error("Ошибка репозитория [getInboundsList]:", e);
      return [];
    }
  }
  async addClient(
    email: string,
    inboundIds: number[] = [],
    clientData: Record<string, any> = {},
  ): Promise<userInfo | null> {
    try {
      const user = await this.getUserByEmail(email);
      if (user) return user;
      let targetInboundIds: number[] = inboundIds;
      if (targetInboundIds.length === 0) {
        const allInboundIds = await this.getInboundsList();
        targetInboundIds = allInboundIds.filter((item) => item.enable).map((item) => item.id);
      }
      if (targetInboundIds.length === 0) {
        console.warn("Нет доступных активных инбаундов для добавления клиента");
        return null;
      }
      const response = await this.apiAdapter.fetchAddClient(email, targetInboundIds, clientData);
      if (response && response.success) return await this.getUserByEmail(email);
      return null;
    } catch (e) {
      console.error("Ошибка репозитория [addClient]:", e);
      return null;
    }
  }
  async getSubLinksByEmail(email: string): Promise<string[]> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) return [];
      const response = await this.apiAdapter.fetchGetSubLinks(user.subId);
      if (response && response.success && Array.isArray(response.obj)) return response.obj;
      return [];
    } catch (e) {
      console.error("Ошибка репозитория [getSubLinksByEmail]:", e);
      return [];
    }
  }
}
export default panelRepository;
