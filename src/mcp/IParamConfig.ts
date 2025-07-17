import { ZodRawShape } from "zod";
import { ICallback } from "./callback/ICallback";

export interface IParamConfig<ICallbackType extends ICallback> {
  name: string;
  systemPrompt: string;
  paramsSchema: ZodRawShape;
  callbackKey: ICallbackType;
}