#!/usr/bin/env node
import { startServer } from "./index";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option("port", {
      alias: "p",
      type: "number",
      default: 3000,
      description: "Порт для MCP-сервера",
    })
    .option("tracker-token", {
      type: "string",
      description: "OAuth-токен Яндекс.Трекера",
    }).argv;

  console.log("🚀 Запуск Yandex Tracker MCP Server...");
  startServer(argv.port, argv["tracker-token"]);
}

main().catch((err) => {
  console.error("Ошибка при запуске сервера:", err);
  process.exit(1);
});
