import { boardSchema, BoardType, CreateBoard, createBoardSchema, ExtendBoardType } from "../models/boards/board";
import { SprintType } from "../models/boards/sprint";
import {
  checkListSchema,
  CheckListType,
  CreateCheckListType,
} from "../models/issues/checklist";
import {
  commentSchema,
  CommentType,
  createCommentSchema,
  CreateComment
} from "../models/issues/comment";
import {
  Issue,
  issueSchema,
  CreateIssue,
  createIssueSchema,
} from "../models/issues/issue";
import { CreateQueue, createQueueSchema, Queue, queueSchema } from "../models/queues/queue";
import { logger } from "../settings/logger";
import { IYandexTrackerCreateAPI } from "./interfaces/IYandexTrackerCreateAPI";
import { YandexTrackerAPI } from "./YandexTrackerAPI";

export class YandexTrackerCreateAPI
  extends YandexTrackerAPI
  implements IYandexTrackerCreateAPI
{
  private static _instance: YandexTrackerCreateAPI;
  private constructor() {
    super();
  }

  public static getInstance(): YandexTrackerCreateAPI {
    if (!YandexTrackerCreateAPI._instance) {
      try {
        logger.debug("Создание экземпляра YandexTrackerAPI");
        YandexTrackerCreateAPI._instance = new YandexTrackerCreateAPI();
      } catch (error) {
        logger.error("Не удалось создать экземпляр YandexTrackerAPI");
        throw error;
      }
    }
    return YandexTrackerCreateAPI._instance;
  }

  /**
   * Создание новой задачи
   *
   * https://yandex.ru/support/tracker/ru/concepts/issues/create-issue
   *
   * @param {CreateIssue} data
   * @return {*}  {Promise<Issue>}
   * @memberof YandexTrackerCreateAPI
   */
  public async createIssue(data: CreateIssue): Promise<Issue> {
    try {
      const response = super.post("issues/", data);
      return issueSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Создание нового чеклиста
   *
   * https://yandex.ru/support/tracker/ru/concepts/issues/add-checklist-item
   *
   * @param {string} issueKey
   * @param {CreateCheckListType} data
   * @return {*}  {Promise<Issue>}
   * @memberof YandexTrackerCreateAPI
   */
  public async createIssueCheckListItem(
    issueKey: string,
    data: CreateCheckListType
  ): Promise<Issue> {
    try {
      const response = super.post(`issues/${issueKey}/checklistItems`, data);
      return issueSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Создание нового комментария
   *
   * https://yandex.ru/support/tracker/ru/concepts/issues/add-comment
   *
   * @param {string} issueKey
   * @param {CreateComment} data
   * @return {*}  {Promise<CommentType>}
   * @memberof YandexTrackerCreateAPI
   */
  public async createIssueComment(
    issueKey: string,
    data: CreateComment
  ): Promise<CommentType> {
    try {
      const response = super.post(`issues/${issueKey}/comments`, data);
      return commentSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Создание новой очереди
   *
   * https://yandex.ru/support/tracker/ru/concepts/queues/create-queue
   *
   * @param {CreateQueue} data
   * @return {*}  {Promise<Queue>}
   * @memberof YandexTrackerCreateAPI
   */
  public async createQueue(data: CreateQueue): Promise<Queue> {
    try {
      const response = super.post("queues/", data);
      return queueSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Создание новой доски
   *
   * https://yandex.ru/support/tracker/ru/post-board
   *
   * @param {CreateBoard} data
   * @return {*}  {Promise<BoardType>}
   * @memberof YandexTrackerCreateAPI
   */
  public async createBoard(data: CreateBoard): Promise<BoardType> {
    try {
      const response = super.post("boards/", data);
      return boardSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /*
    https://yandex.ru/support/tracker/ru/post-sprint
  */
  public async createSprint(data: SprintType): Promise<SprintType> {
    throw new Error("Method not implemented.");
  }
}
