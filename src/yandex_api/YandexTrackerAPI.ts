import { Tracker } from "yandex-tracker-client";
import { config } from "../settings/config";
import { logger } from "../settings/logger";

export class YandexTrackerAPI {
  private readonly _yandexTrackerClient: Tracker;
  protected constructor() {
    this._yandexTrackerClient = new Tracker(
      config.YANDEX_TRACKER_TOKEN,
      undefined,
      config.YANDEX_TRACKER_CLOUD_ORG_ID,
      config.YANDEX_TRACKER_BASE_URL,
      config.REQUEST_TIMEOUT
    );
  }

  protected async get(
    path: string,
    params?: Record<string, any>
  ): Promise<any> {
    try {
      const response = await this._yandexTrackerClient.get(path, params);
      logger.info({ path, params }, "GET");
      return response;
    } catch (error) {
      logger.error({ path, params, error }, "GET");
      throw error;
    }
  }

  protected async post(path: string, data?: Record<string, any>): Promise<any> {
    try {
      const response = await this._yandexTrackerClient.post(path, data);
      logger.info({ status: response.status, path, data }, "POST");
      return response;
    } catch (error) {
      logger.error({ path, data, error }, "POST");
      throw error;
    }
  }
}