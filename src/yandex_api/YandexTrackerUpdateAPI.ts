import { BoardType } from "../models/boards/board";
import { CheckListType, UpdateCheckListType } from "../models/issues/checklist";
import { CommentType } from "../models/issues/comment";
import { Issue, issueSchema, UpdateIssue } from "../models/issues/issue";
import { logger } from "../settings/logger";
import { IYandexTrackerUpdateAPI } from "./interfaces/IYandexTrackerUpdateAPI";
import { YandexTrackerAPI } from "./YandexTrackerAPI";

export class YandexTrackerUpdateAPI
  extends YandexTrackerAPI
  implements IYandexTrackerUpdateAPI
{
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

  /**
   * Обновление задачи
   *
   * https://yandex.ru/support/tracker/ru/concepts/issues/patch-issue
   *
   * @param {string} issueKey
   * @param {UpdateIssue} data
   * @return {*}  {Promise<Issue>}
   * @memberof YandexTrackerUpdateAPI
   */
  public async updateIssue(
    issueKey: string,
    data: UpdateIssue
  ): Promise<Issue> {
    try {
      const response = super.patch(`issues/${issueKey}`, data);
      return issueSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /*
    https://yandex.ru/support/tracker/ru/concepts/issues/edit-checklist
  */
  public async updateIssueCheckList(
    issueKey: string,
    checkListItemKey: string,
    data: UpdateCheckListType
  ): Promise<Issue> {
    try {
      const response = super.patch(
        `issues/${issueKey}/checklistItems/${checkListItemKey}`,
        data
      );
      return issueSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /*
    https://yandex.ru/support/tracker/ru/concepts/issues/edit-comment
  */
  public async updateIssueComment(
    issueKey: string,
    commentKey: string | number,
    data: CommentType
  ): Promise<CommentType> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/patch-board
  */
  public async updateBoard(
    boardId: number,
    data: BoardType
  ): Promise<BoardType> {
    throw new Error("Method not implemented.");
  }
}