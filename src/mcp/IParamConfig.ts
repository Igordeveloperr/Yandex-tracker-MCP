import { ZodRawShape } from "zod";
import { IReadTool } from "./IReadTool";

export interface IParamConfig {
  name: string;
  systemPrompt: string;
  paramsSchema: ZodRawShape;
  callbackKey: IReadTool;
}