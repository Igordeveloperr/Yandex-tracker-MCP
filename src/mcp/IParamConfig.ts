import { ZodRawShape } from "zod";

export interface IParamConfig {
  name: string;
  systemPrompt: string;
  paramsSchema: ZodRawShape;
  callbackKey: string;
}