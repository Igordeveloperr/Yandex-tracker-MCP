import { config } from "../settings/config";
import { YandexTrackerReadAPI } from "../yandex_api/YandexTrackerReadAPI";
import { Tracker } from "yandex-tracker-client";
import { userSchemaSimple, SimpleUser, userSchema, User } from "../models/users/user";
import { Issue } from "../models/issues/issue";
import { Queue } from "../models/queues/queue";
import { IssueType, Priority, Status } from "../models/baseSchemas";

async function test1() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const usr = await api.getMyself();
  console.log(usr);
}

async function test3() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const ques = await api.getQueues({
    expand: ["team"],
  });
  console.log(ques);
}

async function test4() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const usr: Issue = await api.getIssue("MAJOR-1100");
  // console.log(usr);
}

async function test5() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const issues: Issue[] = await api.searchIssueSimple("жилой");
  console.log(issues);
}

async function test6() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const queue: Queue = await api.getQueue("DISCO");
  console.log(queue);
}

async function test7() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const user: SimpleUser[] = await api.getUsers();
  console.log(user);
}

async function test8() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const user: User = await api.getUser("major-homme");
  console.log(user);
}

async function test9() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const issues: Issue[] = await api.searchIssueByFilter(
    {
      queue: "DISCO",
      createdBy: 8000000000000025,
    },
    "+createdAt"
  );
  console.log(issues);
}

async function test10() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const priorities: Priority[] = await api.getPriorities();
  console.log(priorities);
}

async function test11() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const issueTypes: IssueType[] = await api.getIssueTypes();
  console.log(issueTypes);
}

async function test12() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const status: Status[] = await api.getStatuses();
  console.log(status);
}

async function test13() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const issues: Issue[] = await api.searchIssueByQuery(
    'queue: major and type: task',
    false,
    1,
    1
  );
  console.log(issues);
}

async function test14() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const transitions = await api.getIssueTransitions(
    "MAJOR-2768"
  );
  console.log(transitions);
}

async function test15() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const changelog = await api.getIssueChangeLog("MAJOR-2768", 55);
  console.log(changelog);
}

async function test16() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const res = await api.getIssueCheckList("FE-1000", 5, 1);
  console.log(res);
}

async function test17() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const res = await api.getIssueComments("MAJOR-2768", 5, 1);
  console.log(res);
}

async function test18() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const res = await api.getIssueFields();
  console.log(res);
}

async function test19() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const res = await api.getSprint("156");
  console.log(res);
}

async function test20() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const res = await api.getBoardSprints("1");
  console.log(res);
}

async function test21() {
  const api: YandexTrackerReadAPI = YandexTrackerReadAPI.getInstance();
  const res = await api.getBoards();
  console.log(res);
}

test21();
