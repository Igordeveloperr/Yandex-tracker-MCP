import pino from "pino";
import { config } from "./config";
import fs from "fs";
import path from "path";

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
      fs.closeSync(fs.openSync(logPath, 'w'));
    }
    
    return pino.destination(logPath);
  } catch (err) {
    console.error('Failed to setup log file:', err);
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
  getLogDestination(config.LOG_DEST)
);
