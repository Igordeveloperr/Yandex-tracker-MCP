import { IssueType, Priority, Status } from "../../models/baseSchemas";
import { BoardType } from "../../models/boards/board";
import { SprintType } from "../../models/boards/sprint";
import { ChangelogItemType } from "../../models/issues/changelogItem";
import { CheckListType } from "../../models/issues/checklist";
import { CommentType } from "../../models/issues/comment";
import { Issue } from "../../models/issues/issue";
import { IssueFieldType } from "../../models/issues/issueField";
import { TransitionType } from "../../models/issues/transition";
import { ExpandQueue, Queue } from "../../models/queues/queue";
import { SimpleUser, User } from "../../models/users/user";

export interface IYandexTrackerReadAPI {
  getBoards(): Promise<BoardType[]>;

  getBoardSprints(boardId: string): Promise<SprintType[]>;

  getSprint(sprintId: string): Promise<SprintType>;

  getIssueFields(): Promise<IssueFieldType[]>;

  getIssueComments(
    issueKey: string,
    perPage?: number,
    page?: number
  ): Promise<CommentType[]>;

  getIssueCheckList(
    issueKey: string,
    perPage?: number,
    page?: number
  ): Promise<CheckListType[]>;

  getIssueChangeLog(
    issueKey: string,
    perPage?: number,
    page?: number
  ): Promise<ChangelogItemType[]>;

  getIssueTransitions(issueKey: string): Promise<TransitionType[]>;

  getQueues(options?: { expand?: ExpandQueue[] }): Promise<Queue[]>;

  getQueue(queue_key: string | number): Promise<Queue>;

  getIssue(issueKey: string): Promise<Issue>;

  searchIssueByQuery(
    query: string,
    isSimple?: boolean,
    perPage?: number,
    page?: number
  ): Promise<Issue[]>;

  getUsers(): Promise<SimpleUser[]>;

  getUser(key: number | string): Promise<User>;

  getPriorities(): Promise<Priority[]>;
  getIssueTypes(): Promise<IssueType[]>;
  getStatuses(): Promise<Status[]>;
}