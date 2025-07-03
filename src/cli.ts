#!/usr/bin/env node
import { startServer } from "./index";

async function main() {
  console.log("🚀 Запуск Yandex Tracker MCP Server...");
  startServer();
}

main().catch((err) => {
  console.error("Ошибка при запуске сервера:", err);
  process.exit(1);
});
