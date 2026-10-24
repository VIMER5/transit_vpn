import { config } from "../../config.js";
import { Setting } from "../../infrastructure/database/models/settings.model.js";

class appService {
  async PayLoad() {
    const useTgBot = await Setting.findByPk("useTgBot");
    const urlSupport = await Setting.findByPk("urlSupport");
    const subURL = config.domain.domainServer;

    return {
      useTgBot: useTgBot?.value ?? null,
      urlSupport: urlSupport?.value ?? null,
      subURL: subURL,
    };
  }
}

export default new appService();
