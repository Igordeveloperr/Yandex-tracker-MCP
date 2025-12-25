export interface IYandexTrackerCreateAPI {
  createIssue(data: any): Promise<any>;
  createIssueCheckListItem(issueKey: string, data: any): Promise<any>;
  createIssueComment(issueKey: string, data: any): Promise<any>;
  createQueue(data: any): Promise<any>;
  createBoard(data: any): Promise<any>;
  createSprint(data: any): Promise<any>;
}