import { logger } from "../settings/logger";
import { IYandexTrackerDeleteAPI } from "./interfaces/IYandexTrackerDeleteAPI";
import { YandexTrackerAPI } from "./YandexTrackerAPI";

export class YandexTrackerDeleteAPI
  extends YandexTrackerAPI
  implements IYandexTrackerDeleteAPI
{
  private static _instance: YandexTrackerDeleteAPI;
  private constructor() {
    super();
  }

  public static getInstance(): YandexTrackerDeleteAPI {
    if (!YandexTrackerDeleteAPI._instance) {
      try {
        logger.debug("Создание экземпляра YandexTrackerAPI");
        YandexTrackerDeleteAPI._instance = new YandexTrackerDeleteAPI();
      } catch (error) {
        logger.error("Не удалось создать экземпляр YandexTrackerAPI");
        throw error;
      }
    }
    return YandexTrackerDeleteAPI._instance;
  }

  /*
    https://yandex.ru/support/tracker/ru/concepts/issues/delete-checklist
  */
  public async deleteIssueCheckList(issueKey: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/concepts/issues/delete-checklist-item
  */
  public async deleteIssueCheckListItem(
    issueKey: string,
    checkListItemKey: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/concepts/issues/delete-comment
  */
  public async deleteIssueComment(
    issueKey: string,
    commentKey: string | number
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/concepts/queues/delete-queue
  */
  public async deleteQueue(queueKey: string | number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/delete-board
  */
  public async deleteBoard(boardId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}