import { Tracker } from "yandex-tracker-client";
import { config } from "../settings/config";
import { logger } from "../settings/logger";

export class YandexTrackerAPI {
  protected readonly client: Tracker;
  private static _instances: Map<Function, YandexTrackerAPI> = new Map();
  protected constructor() {
    this.client = new Tracker(
      config.YANDEX_TRACKER_TOKEN,
      undefined,
      config.YANDEX_TRACKER_CLOUD_ORG_ID,
      config.YANDEX_TRACKER_BASE_URL,
      config.REQUEST_TIMEOUT
    );
  }
  
  private static createInstance<T extends YandexTrackerAPI>(): T {
    const ctor = this as unknown as { new (): T; name: string };

    if (!YandexTrackerAPI._instances.has(ctor)) {
      try {
        logger.debug(`Создание экземпляра ${ctor.name}`);
        const instance = new ctor();
        YandexTrackerAPI._instances.set(ctor, instance);
      } catch (error) {
        logger.error(`Не удалось создать экземпляр ${ctor.name}`);
        throw error;
      }
    }
    return YandexTrackerAPI._instances.get(ctor) as T;
  }

  public static getInstance<T extends YandexTrackerAPI>(): T{
    return YandexTrackerAPI.createInstance() as T;
  }

  protected async get(
    path: string,
    params?: Record<string, any>
  ): Promise<any> {
    try {
      const response = await this.client.get(path, params);
      logger.info({ path, params }, "GET");
      return response;
    } catch (error) {
      logger.error({ path, params, error }, "GET");
      throw error;
    }
  }

  protected async post(path: string, data?: Record<string, any>): Promise<any> {
    try {
      const response = await this.client.post(path, data);
      logger.info({ status: response.status, path, data }, "POST");
      return response;
    } catch (error) {
      logger.error({ path, data, error }, "POST");
      throw error;
    }
  }
}