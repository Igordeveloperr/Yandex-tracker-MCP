import { BoardType, ExtendBoardType } from "../models/boards/board";
import { SprintType } from "../models/boards/sprint";
import { CheckListType } from "../models/issues/checklist";
import { CommentType } from "../models/issues/comment";
import {
  Issue,
  issueSchema,
  CreateIssue,
  createIssueSchema,
} from "../models/issues/issue";
import { Queue } from "../models/queues/queue";
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

  /*
    https://yandex.ru/support/tracker/ru/concepts/issues/add-checklist-item
  */
  public async createIssueCheckListItem(
    issueKey: string,
    data: CheckListType
  ): Promise<CheckListType> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/concepts/issues/add-comment
  */
  public async createIssueComment(
    issueKey: string,
    data: CommentType
  ): Promise<CommentType> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/concepts/queues/create-queue
  */
  public async createQueue(data: Queue): Promise<Queue> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/post-board
  */
  public async createBoard(data: ExtendBoardType): Promise<BoardType> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/post-sprint
  */
  public async createSprint(data: SprintType): Promise<SprintType> {
    throw new Error("Method not implemented.");
  }
}
