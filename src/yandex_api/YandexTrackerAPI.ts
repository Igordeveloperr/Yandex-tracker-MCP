import { logger } from "../settings/logger";
import {
  Issue,
  issueSchema,
  SimpleIssue,
  issueSchemaSimple,
} from "../models/issue";
import { config } from "../settings/config";
import { Tracker } from "yandex-tracker-client";
import { ExpandQueue, Queue, queueSchema } from "../models/queue";
import { userSchemaSimple, SimpleUser, userSchema, User } from "../models/user";
import {
  Priority,
  prioritySchema,
  IssueType,
  issueTypeSchema,
  Status,
  statusSchema,
} from "../models/baseSchemas";
import { response } from "express";
import { transitionSchema, TransitionType } from "../models/transition";
import { changelogItemSchema, ChangelogItemType } from "../models/changelogItem";
import { checkListSchema, CheckListType } from "../models/checklist";
import { commentSchema, CommentType } from "../models/comment";

// данный класс реализует паттерн singelton для доступа к API Yandex Tracker
export class YandexTrackerAPI {
  private readonly client: Tracker;
  private static instance: YandexTrackerAPI;

  /**
   * инициализация клиента для яндекс трекера
   */
  private constructor() {
    this.client = new Tracker(
      config.YANDEX_TRACKER_TOKEN,
      undefined,
      config.YANDEX_TRACKER_CLOUD_ORG_ID,
      config.YANDEX_TRACKER_BASE_URL,
      config.REQUEST_TIMEOUT
    );
  }

  /**
   * Статический метод для получения экземпляра
   * @returns {YandexTrackerAPI} - объект api яндекса
   */
  public static getInstance(): YandexTrackerAPI {
    if (!YandexTrackerAPI.instance) {
      try {
        logger.debug("Создание экземпляра YandexTrackerAPI");
        YandexTrackerAPI.instance = new YandexTrackerAPI();
      } catch (error) {
        logger.error("Не удалось создать экземпляр YandexTrackerAPI");
        throw error;
      }
    }
    return YandexTrackerAPI.instance;
  }

  public async get(path: string, params?: Record<string, any>): Promise<any> {
    try {
      const response = await this.client.get(path, params);
      logger.info({ path, params }, "GET");
      return response;
    } catch (error) {
      logger.error({ path, params, error }, "GET");
      throw error;
    }
  }

  public async post(path: string, data?: Record<string, any>): Promise<any> {
    try {
      const response = await this.client.post(path, data);
      logger.info({ status: response.status, path, data }, "POST");
      return response;
    } catch (error) {
      logger.error({ status: response.status, path, data, error }, "POST");
      throw error;
    }
  }

  /**
   * функция для тестирования get запросов
   *
   * @param {string} path не должен начинаться с /
   * @param {object} [params]
   * @return {*}  {Promise <any>}
   * @memberof YandexTrackerAPI
   */
  async manualGet(path: string, params?: object): Promise<any> {
    const response = await this.get(path, params);
    return response;
  }

  /**
   * Функция для тестирования post запросов
   *
   * @param {string} path
   * @param {object} [params]
   * @return {*}  {Promise<any>}
   * @memberof YandexTrackerAPI
   */
  async manualPost(path: string, params?: object): Promise<any> {
    const response = await this.post(path, params);
    return response;
  }

  // получение комментариев задачи
  async getIssueFields(): Promise<CommentType[]> {
    try {
      const response = await this.get(
        `issues/${issueKey}/comments?perPage=${perPage}&page=${page}`
      );
      return commentSchema.array().parse(response);
    } catch (error) {
      throw error;
    }
  }

  // получение комментариев задачи
  async getIssueComments(
    issueKey: string,
    perPage: number = 50,
    page: number = 1
  ): Promise<CommentType[]> {
    try {
      const response = await this.get(
        `issues/${issueKey}/comments?perPage=${perPage}&page=${page}`
      );
      return commentSchema.array().parse(response);
    } catch (error) {
      throw error;
    }
  }

  // получение параметров чеклиста задачи
  async getIssueCheckList(
    issueKey: string,
    perPage: number = 50,
    page: number = 1
  ): Promise<CheckListType[]> {
    try {
      const response = await this.get(
        `issues/${issueKey}/checklistItems?perPage=${perPage}&page=${page}`
      );
      return checkListSchema.array().parse(response);
    } catch (error) {
      throw error;
    }
  }

  // пролучить историю изменений задачи
  async getIssueChangeLog(
    issueKey: string,
    perPage: number = 50,
    page: number = 1
  ): Promise<ChangelogItemType[]> {
    try {
      const response = await this.get(
        `issues/${issueKey}/changelog?perPage=${perPage}&page=${page}`
      );
      return changelogItemSchema.array().parse(response);
    } catch (error) {
      throw error;
    }
  }

  // получение переходов задачи по issueKey
  async getIssueTransitions(issueKey: string): Promise<TransitionType[]> {
    try {
      const response = await this.get(`issues/${issueKey}/transitions`);
      return transitionSchema.array().parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Получение данных о текущем пользователе
   *
   * @return {*}  {Promise<User>}
   * @memberof YandexTrackerAPI
   */
  async getMyself(): Promise<User> {
    try {
      const response = await this.get("myself");
      return userSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Получение всех существующих очередей
   *
   * @return {Promise<Queue[]>}
   * @memberof YandexTrackerAPI
   */
  async getQueues(options?: { expand?: ExpandQueue[] }): Promise<Queue[]> {
    try {
      const params: Record<string, string> = {};
      if (options?.expand) {
        params.expand = options.expand.join(",");
      }

      const response = await this.get("queues", params);
      return queueSchema.array().parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Получение очереди по ключу или id
   *
   * @param {(string | number)} queue_key - ключ (обязательно большими буквами) или id
   * @return {*}  {Promise<Queue>} - модель очереди
   * @memberof YandexTrackerAPI
   */
  async getQueue(queue_key: string | number): Promise<Queue> {
    try {
      const response = await this.get(`queues/${queue_key}`);
      return queueSchema.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Получение задачи по ключу или id
   * @param {string} issueKey ключ задачи или идентификатор
   * @returns {Promise<Issue>} - модель задачи
   */
  async getIssue(issueKey: string): Promise<Issue> {
    try {
      const response = await this.get(`issues/${issueKey}`);
      return issueSchema.parse(response);
    } catch (error) {
      throw error;
    }
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
  async searchIssueSimple(input: string): Promise<Issue[]> {
    try {
      const response = await this.get("issues/_suggest", {
        input: input,
        full: true,
        fields: "summary",
      });
      return issueSchema.array().parse(response);
    } catch (error) {
      throw error;
    }
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
  async searchIssueByFilter(
    filter: Record<string, any>,
    order?: string,
    perPage: number = 50,
    page: number = 1
  ): Promise<Issue[]> {
    const body = {
      filter,
      order,
    };

    try {
      const response = await this.post(
        `issues/_search?perPage=${perPage}&page=${page}`,
        body
      );
      return issueSchema.array().parse(response);
    } catch (error) {
      throw error;
    }
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
  async searchIssueByQuery(
    query: string,
    isSimple: boolean = true,
    perPage: number = 50,
    page: number = 1
  ): Promise<Issue[]> {
    try {
      const response = await this.post(
        `issues/_search?perPage=${perPage}&page=${page}`,
        { query }
      );
      if (isSimple) {
        return issueSchemaSimple.array().parse(response);
      }
      return issueSchema.array().parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Получение всех пользователей
   *
   * @return {*}  {Promise<SimpleUser[]>}Список простых моделей пользователей (имя + id)
   * @memberof YandexTrackerAPI
   */
  async getUsers(): Promise<SimpleUser[]> {
    const response = await this.get("users");
    return userSchemaSimple.array().parse(response);
  }

  /**
   * Получение конкретного пользователя по id или login
   *
   * @param {number | string} key - id или login
   * @return {*}  {Promise<User>} - найденный пользователь
   * @memberof YandexTrackerAPI
   */
  async getUser(key: number | string): Promise<User> {
    const response = await this.get(`users/${key}`);
    return userSchema.parse(response);
  }

  /**
   * Получение списка приоритетов для задач
   *
   * @return {*}  {Promise<Priority[]>}
   * @memberof YandexTrackerAPI
   */
  async getPriorities(): Promise<Priority[]> {
    const response = await this.get("priorities");
    return prioritySchema.array().parse(response);
  }

  /**
   * Получение типов задач
   *
   * @return {*}  {Promise<IssueType[]>}
   * @memberof YandexTrackerAPI
   */
  async getIssueTypes(): Promise<IssueType[]> {
    const response = await this.get("issuetypes");
    return issueTypeSchema.array().parse(response);
  }

  /**
   * Получение статусов задач
   *
   * @return {*}  {Promise<Status[]>}
   * @memberof YandexTrackerAPI
   */
  async getStatuses(): Promise<Status[]> {
    const response = await this.get("statuses");
    return statusSchema.array().parse(response);
  }

  async createIssue(): Promise<any> {
    // TODO: Создание новой задачи
  }

  async updateIssue(): Promise<void> {
    // TODO: Обновление существующей задачи
  }

  async transitionIssue(): Promise<void> {
    // TODO: Изменение статуса задачи
  }

  async addComment(): Promise<void> {
    // TODO: Добавление комментария к задаче
  }

  async getComments(): Promise<void> {
    // TODO: Получение комментариев задачи
  }
}
