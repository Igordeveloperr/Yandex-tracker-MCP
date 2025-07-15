import { BoardType } from "../models/boards/board";
import { CheckListType } from "../models/issues/checklist";
import { CommentType } from "../models/issues/comment";
import { Issue } from "../models/issues/issue";
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

  /*
    https://yandex.ru/support/tracker/ru/concepts/issues/patch-issue
  */
  public async updateIssue(issueKey: string, data: Issue): Promise<Issue> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/concepts/issues/edit-checklist
  */
  public async updateCheckList(
    issueKey: string,
    checkListItemKey: string,
    data: CheckListType
  ): Promise<CheckListType> {
    throw new Error("Method not implemented.");
  }

  /*
    https://yandex.ru/support/tracker/ru/concepts/issues/edit-comment
  */
  public async updateComment(
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