import { ZodRawShape } from "zod";

export interface IToolConfig {
  name: string;
  systemPrompt: string;
  paramsSchema: ZodRawShape;
  callbackKey: string;
}