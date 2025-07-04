import { z } from "zod";
import dotenv from "dotenv";
import { OperatingModeName } from "../enums/env/OperatingModeName";

dotenv.config();

const envSchema = z.object({
  YANDEX_TRACKER_TOKEN: z.string(),
  YANDEX_TRACKER_CLOUD_ORG_ID: z.string(),
  YANDEX_TRACKER_BASE_URL: z.string().url(),
  MCP_SERVER_BASE_URL: z.string().url(),
  LOG_LEVEL: z
    .enum(["trace", "debug", "info", "warn", "error", "fatal"])
    .default("info"),
  LOG_DEST: z.string(),
  REQUEST_TIMEOUT: z.coerce.number().default(30000),
  RATE_LIMIT_REQUESTS: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW: z.coerce.number().default(60000),
  OPERATING_MODE: z.enum([
    OperatingModeName.SSEMode,
    OperatingModeName.StdioMode,
  ]),
});

export const config = envSchema.parse(process.env);

// export type EnvConfig = z.infer<typeof envSchema>;
