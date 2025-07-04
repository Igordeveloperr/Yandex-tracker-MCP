#!/usr/bin/env node
import { startStdioServer } from "./index";

async function mainCli() {
  console.log("🚀 Запуск Yandex Tracker MCP Server...");
  startStdioServer();
}

mainCli().catch((err) => {
  console.error("Ошибка при запуске сервера:", err);
  process.exit(1);
});
