#!/usr/bin/env node
import { startStdioServer } from "./index";

async function main() {
  console.log("🚀 Запуск Yandex Tracker MCP Server...");
  startStdioServer();
}

main().catch((err) => {
  console.error("Ошибка при запуске сервера:", err);
  process.exit(1);
});
