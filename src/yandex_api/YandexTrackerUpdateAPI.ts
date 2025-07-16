import { boardSchema, BoardType, UpdateBoard } from "../models/boards/board";
import { CheckListType, UpdateCheckListType } from "../models/issues/checklist";
import {
  commentSchema,
  CommentType,
  UpdateComment,
} from "../models/issues/comment";
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

  /**
   * Обновление чеклиста
   *
   * https://yandex.ru/support/tracker/ru/concepts/issues/edit-checklist
   *
   * @param {string} issueKey
   * @param {string} checkListItemKey
   * @param {UpdateCheckListType} data
   * @return {*}  {Promise<Issue>}
   * @memberof YandexTrackerUpdateAPI
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

  /**
   * Обновление комментария
   *
   * https://yandex.ru/support/tracker/ru/concepts/issues/edit-comment
   *
   * @param {string} issueKey
   * @param {(string | number)} commentKey
   * @param {UpdateComment} data
   * @return {*}  {Promise<CommentType>}
   * @memberof YandexTrackerUpdateAPI
   */
  public async updateIssueComment(
    issueKey: string,
    commentKey: string | number,
    data: UpdateComment
  ): Promise<CommentType> {
    try {
      const response = super.patch(
        `issues/${issueKey}/comments/${commentKey}`,
        data
      );
      return commentSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Обновление доски
   *
   * https://yandex.ru/support/tracker/ru/patch-board
   *
   * @param {number} boardId
   * @param {UpdateBoard} data
   * @return {*}  {Promise<BoardType>}
   * @memberof YandexTrackerUpdateAPI
   */
  public async updateBoard(
    boardId: number,
    data: UpdateBoard
  ): Promise<BoardType> {
    try {
      const response = super.patch(`boards/${boardId}`, data);
      return boardSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }
}
