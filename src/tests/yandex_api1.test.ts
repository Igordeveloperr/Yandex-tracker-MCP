import { config } from "../settings/config";
import { YandexTrackerAPI } from "../yandex_api/YandexTrackerAPI";
import { Tracker } from "yandex-tracker-client";
import { userSchemaSimple, SimpleUser, userSchema, User } from "../models/users/user";
import { Issue } from "../models/issues/issue";
import { Queue } from "../models/queues/queue";
import { IssueType, Priority, Status } from "../models/baseSchemas";

async function test0() {
  const api = new Tracker(
    config.YANDEX_TRACKER_TOKEN,
    undefined,
    config.YANDEX_TRACKER_CLOUD_ORG_ID,
    config.YANDEX_TRACKER_BASE_URL
  );

  const res = await api.get("myself");
  console.log(res);
  var usr = userSchemaSimple.parse(res);
  console.log(usr);
}

async function test1() {
  const api = YandexTrackerAPI.getInstance();
  const usr = await api.getMyself();
  console.log(usr);
}

async function test2() {
  const api = YandexTrackerAPI.getInstance();
  const params = {
    filter: {
      queue: "MAJOR",
      type: {
        id: 1,
      },
      tags: ["backend"],
    },
    order: "+status",
  };
  const usr = await api.manualPost("issues/_search?perPage=1&page=2", params);
  console.log(usr);
}

async function test3() {
  const api = YandexTrackerAPI.getInstance();
  const ques = await api.getQueues({
    expand: ["team"],
  });
  console.log(ques);
}

async function test4() {
  const api = YandexTrackerAPI.getInstance();
  const usr: Issue = await api.getIssue("MAJOR-1100");
  // console.log(usr);
}

async function test5() {
  const api = YandexTrackerAPI.getInstance();
  const issues: Issue[] = await api.searchIssueSimple("жилой");
  console.log(issues);
}

async function test6() {
  const api = YandexTrackerAPI.getInstance();
  const queue: Queue = await api.getQueue("DISCO");
  console.log(queue);
}

async function test7() {
  const api = YandexTrackerAPI.getInstance();
  const user: SimpleUser[] = await api.getUsers();
  console.log(user);
}

async function test8() {
  const api = YandexTrackerAPI.getInstance();
  const user: User = await api.getUser("major-homme");
  console.log(user);
}

async function test9() {
  const api = YandexTrackerAPI.getInstance();
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
  const api = YandexTrackerAPI.getInstance();
  const priorities: Priority[] = await api.getPriorities();
  console.log(priorities);
}

async function test11() {
  const api = YandexTrackerAPI.getInstance();
  const issueTypes: IssueType[] = await api.getIssueTypes();
  console.log(issueTypes);
}

async function test12() {
  const api = YandexTrackerAPI.getInstance();
  const status: Status[] = await api.getStatuses();
  console.log(status);
}

async function test13() {
  const api = YandexTrackerAPI.getInstance();
  const issues: Issue[] = await api.searchIssueByQuery(
    'queue: major and type: task',
    false,
    1,
    1
  );
  console.log(issues);
}

async function test14() {
  const api = YandexTrackerAPI.getInstance();
  const transitions = await api.getIssueTransitions(
    "MAJOR-2768"
  );
  console.log(transitions);
}

async function test15() {
  const api = YandexTrackerAPI.getInstance();
  const changelog = await api.getIssueChangeLog("MAJOR-2768", 55);
  console.log(changelog);
}

async function test16() {
  const api = YandexTrackerAPI.getInstance();
  const res = await api.getIssueCheckList("FE-1000", 5, 1);
  console.log(res);
}

async function test17() {
  const api = YandexTrackerAPI.getInstance();
  const res = await api.getIssueComments("MAJOR-2768", 5, 1);
  console.log(res);
}

async function test18() {
  const api = YandexTrackerAPI.getInstance();
  const res = await api.getIssueFields();
  console.log(res);
}

async function test19() {
  const api = YandexTrackerAPI.getInstance();
  const res = await api.getSprint("156");
  console.log(res);
}

async function test20() {
  const api = YandexTrackerAPI.getInstance();
  const res = await api.getBoardSprints("78");
  console.log(res);
}

test20();
