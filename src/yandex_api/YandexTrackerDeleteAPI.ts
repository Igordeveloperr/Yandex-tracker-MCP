import { Issue, issueSchema } from "../models/issues/issue";
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

  /**
   * Удаление чеклиста
   *
   * https://yandex.ru/support/tracker/ru/concepts/issues/delete-checklist
   *
   * @param {string} issueKey
   * @return {*}  {Promise<Issue>}
   * @memberof YandexTrackerDeleteAPI
   */
  public async deleteIssueCheckList(issueKey: string): Promise<Issue> {
    try {
      const response = super.delete(`issues/${issueKey}/checklistItems`);
      return issueSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Удаление элемента чеклиста
   *
   * https://yandex.ru/support/tracker/ru/concepts/issues/delete-checklist-item
   *
   * @param {string} issueKey
   * @param {string} checkListItemKey
   * @return {*}  {Promise<Issue>}
   * @memberof YandexTrackerDeleteAPI
   */
  public async deleteIssueCheckListItem(
    issueKey: string,
    checkListItemKey: string
  ): Promise<Issue> {
    try {
      const response = super.delete(
        `issues/${issueKey}/checklistItems/${checkListItemKey}`
      );
      return issueSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Удаление комментария
   *
   * @param {string} issueKey
   * @param {(string | number)} commentKey
   * @return {*}  {Promise<number>} 0 если успешно, иначе 1
   * @memberof YandexTrackerDeleteAPI
   */
  public async deleteIssueComment(
    issueKey: string,
    commentKey: string | number
  ): Promise<number> {
    try {
      const response = await super.delete(
        `issues/${issueKey}/comments/${commentKey}`
      );
      return (response.status == 204) ? 0 : 1;
    } catch (error) {
      throw error;
    }
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
