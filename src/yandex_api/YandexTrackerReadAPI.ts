import type { Issue } from "../models/issues/issue";
import { issueSchema, issueSchemaSimple } from "../models/issues/issue";
import type { ExpandQueue, Queue } from "../models/queues/queue";
import { queueSchema } from "../models/queues/queue";
import type { SimpleUser, User } from "../models/users/user";
import { userSchemaSimple, userSchema } from "../models/users/user";
import type { Priority, IssueType, Status } from "../models/baseSchemas";
import {
  prioritySchema,
  issueTypeSchema,
  statusSchema,
} from "../models/baseSchemas";
import type { TransitionType } from "../models/issues/transition";
import { transitionSchema } from "../models/issues/transition";
import type { ChangelogItemType } from "../models/issues/changelogItem";
import { changelogItemSchema } from "../models/issues/changelogItem";
import type { CheckListType } from "../models/issues/checklist";
import { checkListSchema } from "../models/issues/checklist";
import type { CommentType } from "../models/issues/comment";
import { commentSchema } from "../models/issues/comment";
import type { IssueFieldType } from "../models/issues/issueField";
import { issueFieldSchema } from "../models/issues/issueField";
import type { SprintType } from "../models/boards/sprint";
import { sprintSchema } from "../models/boards/sprint";
import type { BoardType } from "../models/boards/board";
import { boardSchema } from "../models/boards/board";
import type { IYandexTrackerReadAPI } from "./interfaces/IYandexTrackerReadAPI";
import { YandexTrackerAPI } from "./YandexTrackerAPI";
import { logger } from "../settings/logger";

// данный класс реализует паттерн singelton для доступа к API Yandex Tracker
export class YandexTrackerReadAPI
  extends YandexTrackerAPI
  implements IYandexTrackerReadAPI
{
  private static instance: YandexTrackerReadAPI;

  private constructor() {
    super();
  }

  public static getInstance(): YandexTrackerReadAPI {
    if (!YandexTrackerReadAPI.instance) {
      try {
        logger.debug("Создание экземпляра YandexTrackerAPI");
        YandexTrackerReadAPI.instance = new YandexTrackerReadAPI();
      } catch (error) {
        logger.error("Не удалось создать экземпляр YandexTrackerAPI");
        throw error;
      }
    }
    return YandexTrackerReadAPI.instance;
  }

  // получение досок
  public async getBoards(): Promise<BoardType[]> {
    const response = await super.get(`boards`);
    return boardSchema.array().parse(response);
  }

  // получение спринтов доски
  public async getBoardSprints(boardId: string): Promise<SprintType[]> {
    const response = await super.get(`boards/${boardId}/sprints`);
    return sprintSchema.array().parse(response);
  }

  // получение спринта
  public async getSprint(sprintId: string): Promise<SprintType> {
    const response = await super.get(`sprints/${sprintId}`);
    return sprintSchema.parse(response);
  }

  // получение полей задачи
  public async getIssueFields(): Promise<IssueFieldType[]> {
    const response = await super.get(`fields`);
    return issueFieldSchema.array().parse(response);
  }

  // получение комментариев задачи
  public async getIssueComments(
    issueKey: string,
    perPage: number = 50,
    page: number = 1,
  ): Promise<CommentType[]> {
    const response = await super.get(
      `issues/${issueKey}/comments?perPage=${perPage}&page=${page}`,
    );
    return commentSchema.array().parse(response);
  }

  // получение параметров чеклиста задачи
  public async getIssueCheckList(
    issueKey: string,
    perPage: number = 50,
    page: number = 1,
  ): Promise<CheckListType[]> {
    const response = await super.get(
      `issues/${issueKey}/checklistItems?perPage=${perPage}&page=${page}`,
    );
    return checkListSchema.array().parse(response);
  }

  // пролучить историю изменений задачи
  public async getIssueChangeLog(
    issueKey: string,
    perPage: number = 50,
    page: number = 1,
  ): Promise<ChangelogItemType[]> {
    const response = await super.get(
      `issues/${issueKey}/changelog?perPage=${perPage}&page=${page}`,
    );
    return changelogItemSchema.array().parse(response);
  }

  // получение переходов задачи по issueKey
  public async getIssueTransitions(
    issueKey: string,
  ): Promise<TransitionType[]> {
    const response = await super.get(`issues/${issueKey}/transitions`);
    return transitionSchema.array().parse(response);
  }

  /**
   * Получение данных о текущем пользователе
   *
   * @return {*}  {Promise<User>}
   * @memberof YandexTrackerAPI
   */
  public async getMyself(): Promise<User> {
    const response = await super.get("myself");
    return userSchema.parse(response);
  }

  /**
   * Получение всех существующих очередей
   *
   * @return {Promise<Queue[]>}
   * @memberof YandexTrackerAPI
   */
  public async getQueues(options?: {
    expand?: ExpandQueue[];
  }): Promise<Queue[]> {
    const params: Record<string, string> = {};
    if (options?.expand) {
      params.expand = options.expand.join(",");
    }

    const response = await super.get("queues", params);
    return queueSchema.array().parse(response);
  }

  /**
   * Получение очереди по ключу или id
   *
   * @param {(string | number)} queueKey - ключ (обязательно большими буквами) или id
   * @return {*}  {Promise<Queue>} - модель очереди
   * @memberof YandexTrackerAPI
   */
  public async getQueue(queueKey: string | number): Promise<Queue> {
    const response = await super.get(`queues/${queueKey}`);
    return queueSchema.parse(response);
  }

  /**
   * Получение задачи по ключу или id
   * @param {string} issueKey ключ задачи или идентификатор
   * @returns {Promise<Issue>} - модель задачи
   */
  public async getIssue(issueKey: string): Promise<Issue> {
    const response = await super.get(`issues/${issueKey}`);
    return issueSchema.parse(response);
  }

  /**
   * Простой поиск задачи по описанию.
   *
   * @param {string} input - Фрагмент текста для вывода списка задач.
   * Если между словами в тексте указан пробел, в выдачу также попадут результаты,
   * в которых есть любой текст на месте пробела.
   * @return {*}  {Promise<Issue[]>} возвращает упрощённую модель задачи
   * @memberof YandexTrackerAPI
   */
  public async searchIssueSimple(input: string): Promise<Issue[]> {
    const response = await super.get("issues/_suggest", {
      input,
      full: true,
      fields: "summary",
    });
    return issueSchema.array().parse(response);
  }

  /**
   * Поиск задачи по любым параметрам с использованием фильтра.
   * Позволяет получить список задач, удовлетворяющих заданному критерию.
   *
   * @param {Record<string, any>} filter
   * Параметры фильтрации задач. В параметре можно указать название
   * любого поля и значение, по которому будет производиться фильтрация
   * @param {string} order
   * Направление и поле сортировки задач.
   * Значение указывается в формате [+/-]<ключ_поля>.
   * Знак + или - обозначает направление сортировки.
   * @param {number} [perPage=50]
   * Количество задач на странице ответа. Значение по умолчанию — 50.
   * @param {number} [page=1]
   * Номер страницы. Значение по умолчанию — 1.
   * @return {*}  {Promise<Issue[]>}
   * @memberof YandexTrackerAPI
   */
  public async searchIssueByFilter(
    filter: Record<string, any>,
    order?: string,
    perPage: number = 50,
    page: number = 1,
  ): Promise<Issue[]> {
    const body = {
      filter,
      order,
    };

    const response = await super.post(
      `issues/_search?perPage=${perPage}&page=${page}`,
      body,
    );
    return issueSchema.array().parse(response);
  }

  /**
   * Поиск задачи по любым параметрам с использованием языка запросов.
   * Позволяет получить список задач, удовлетворяющих запросу.
   *
   * @param {string} query
   * Запрос на языке запросов Яндекс Трекера
   * @param {boolean} [isSimple=false]
   * Простые ли задачи возвращать. При большом количестве задач использовать с True. Значение по умолчанию — false.
   * @param {number} [perPage=50]
   * Количество задач на странице ответа. Значение по умолчанию — 50.
   * @param {number} [page=1]
   * Номер страницы. Значение по умолчанию — 1.
   * @return {*}  {Promise<Issue[]>}
   * @memberof YandexTrackerAPI
   */
  public async searchIssueByQuery(
    query: string,
    isSimple: boolean = true,
    perPage: number = 50,
    page: number = 1,
  ): Promise<Issue[]> {
    const response = await super.post(
      `issues/_search?perPage=${perPage}&page=${page}`,
      { query },
    );
    if (isSimple) {
      return issueSchemaSimple.array().parse(response);
    }
    return issueSchema.array().parse(response);
  }

  /**
   * Получение всех пользователей
   *
   * @return {*}  {Promise<SimpleUser[]>}Список простых моделей пользователей (имя + id)
   * @memberof YandexTrackerAPI
   */
  public async getUsers(): Promise<SimpleUser[]> {
    const response = await super.get("users");
    return userSchemaSimple.array().parse(response);
  }

  /**
   * Получение конкретного пользователя по id или login
   *
   * @param {number | string} key - id или login
   * @return {*}  {Promise<User>} - найденный пользователь
   * @memberof YandexTrackerAPI
   */
  public async getUser(key: number | string): Promise<User> {
    const response = await super.get(`users/${key}`);
    return userSchema.parse(response);
  }

  /**
   * Получение списка приоритетов для задач
   *
   * @return {*}  {Promise<Priority[]>}
   * @memberof YandexTrackerAPI
   */
  public async getPriorities(): Promise<Priority[]> {
    const response = await super.get("priorities");
    return prioritySchema.array().parse(response);
  }

  /**
   * Получение типов задач
   *
   * @return {*}  {Promise<IssueType[]>}
   * @memberof YandexTrackerAPI
   */
  public async getIssueTypes(): Promise<IssueType[]> {
    const response = await super.get("issuetypes");
    return issueTypeSchema.array().parse(response);
  }

  /**
   * Получение статусов задач
   *
   * @return {*}  {Promise<Status[]>}
   * @memberof YandexTrackerAPI
   */
  public async getStatuses(): Promise<Status[]> {
    const response = await super.get("statuses");
    return statusSchema.array().parse(response);
  }
}
