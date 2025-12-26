import type { IssueType, Priority, Status } from "../../models/baseSchemas";
import type { BoardType } from "../../models/boards/board";
import type { SprintType } from "../../models/boards/sprint";
import type { ChangelogItemType } from "../../models/issues/changelogItem";
import type { CheckListType } from "../../models/issues/checklist";
import type { CommentType } from "../../models/issues/comment";
import type { Issue } from "../../models/issues/issue";
import type { IssueFieldType } from "../../models/issues/issueField";
import type { TransitionType } from "../../models/issues/transition";
import type { ExpandQueue, Queue } from "../../models/queues/queue";
import type { SimpleUser, User } from "../../models/users/user";

export interface IYandexTrackerReadAPI {
  getBoards(): Promise<BoardType[]>;

  getBoardSprints(boardId: string): Promise<SprintType[]>;

  getSprint(sprintId: string): Promise<SprintType>;

  getIssueFields(): Promise<IssueFieldType[]>;

  getIssueComments(
    issueKey: string,
    perPage?: number,
    page?: number,
  ): Promise<CommentType[]>;

  getIssueCheckList(
    issueKey: string,
    perPage?: number,
    page?: number,
  ): Promise<CheckListType[]>;

  getIssueChangeLog(
    issueKey: string,
    perPage?: number,
    page?: number,
  ): Promise<ChangelogItemType[]>;

  getIssueTransitions(issueKey: string): Promise<TransitionType[]>;

  getQueues(options?: { expand?: ExpandQueue[] }): Promise<Queue[]>;

  getQueue(queue_key: string | number): Promise<Queue>;

  getIssue(issueKey: string): Promise<Issue>;

  searchIssueByQuery(
    query: string,
    isSimple?: boolean,
    perPage?: number,
    page?: number,
  ): Promise<Issue[]>;

  getUsers(): Promise<SimpleUser[]>;

  getUser(key: number | string): Promise<User>;

  getPriorities(): Promise<Priority[]>;
  getIssueTypes(): Promise<IssueType[]>;
  getStatuses(): Promise<Status[]>;
}
