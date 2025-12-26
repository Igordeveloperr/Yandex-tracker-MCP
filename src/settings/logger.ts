import pino from "pino";
import fs from "fs";
import path from "path";
import { config } from "./config";

// Функция для проверки и создания файла при необходимости
function getLogDestination(logPath: string | undefined) {
  if (!logPath) return undefined;

  try {
    // Создаем директорию, если она не существует
    const dir = path.dirname(logPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Создаем файл, если он не существует
    if (!fs.existsSync(logPath)) {
      fs.closeSync(fs.openSync(logPath, "w"));
    }

    return pino.destination(logPath);
  } catch (err) {
    // Log error using a temporary logger instead of the main logger
    const tempLogger = pino({
      level: config.LOG_LEVEL,
      formatters: {
        level(label) {
          return { level: label };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    });
    tempLogger.error(err, "Failed to setup log file");
    return undefined;
  }
}

export const logger = pino(
  {
    level: config.LOG_LEVEL,
    formatters: {
      level(label) {
        return { level: label };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  getLogDestination(config.LOG_DEST),
);
