import { logger } from "../settings/logger";
import { IYandexTrackerUpdateAPI } from "./interfaces/IYandexTrackerUpdateAPI";
import { YandexTrackerAPI } from "./YandexTrackerAPI";

export class YandexTrackerUpdateAPI extends YandexTrackerAPI implements IYandexTrackerUpdateAPI{
  private static _instance: YandexTrackerUpdateAPI;
  private constructor() {
    super();
  }

    public static getInstance(): YandexTrackerUpdateAPI {
      if (!YandexTrackerUpdateAPI._instance) {
        try {
          logger.debug("Создание экземпляра YandexTrackerAPI");
          YandexTrackerUpdateAPI._instance = new YandexTrackerUpdateAPI();
        } catch (error) {
          logger.error("Не удалось создать экземпляр YandexTrackerAPI");
          throw error;
        }
      }
      return YandexTrackerUpdateAPI._instance;
    }

    
}