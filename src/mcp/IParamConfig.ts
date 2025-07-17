import { ZodRawShape } from "zod";
import { ICallback } from "./callback_interfaces/ICallback";

export interface IParamConfig<ICallbackType extends ICallback> {
  name: string;
  systemPrompt: string;
  paramsSchema: ZodRawShape;
  callbackKey: keyof ICallbackType;
}