import { clientAgent, clientType } from "../../shared/types/subscriptions.type.js";
import { IncomingHttpHeaders } from "node:http";

class clientService {
  clientTypeDetection(headers: IncomingHttpHeaders): clientType {
    const clientDictionary = ["INCY", "Happ"];
    const userAgent = headers["user-agent"] ?? "";
    const clientName: clientAgent =
      (clientDictionary.find((word) => userAgent.includes(word)) as clientAgent) ?? "browser";
    if (clientName === "browser")
      return { isVpnClient: false, agent: clientName, deviceName: null, os: null, hwid: null };
    let os;
    const deviceOs = headers["x-device-os"]?.toString() ?? "Na";
    const vOS = headers["x-ver-os"]?.toString() ?? "Na";
    const deviceModel = headers["x-device-model"]?.toString() ?? "Na";
    const hwid = headers["x-hwid"]?.toString() ?? null;
    switch (clientName) {
      case "INCY":
        os = `${deviceOs} ${vOS}`;
        break;
      case "Happ":
        os = `${deviceOs} ${vOS.split("_")[0] ?? "NA"}`;
        break;
    }
    return { isVpnClient: true, agent: clientName, deviceName: deviceModel, os, hwid };
  }
}

export default new clientService();
