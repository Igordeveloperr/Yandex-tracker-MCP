#!/usr/bin/env node
import { startYandexTrackerMcpMain } from "./index";

async function mainCli() {
  console.log("🚀 Запуск Yandex Tracker MCP Server...");
  await startYandexTrackerMcpMain();
}

mainCli().catch((err) => {
  console.error("Ошибка при запуске сервера:", err);
  process.exit(1);
});
