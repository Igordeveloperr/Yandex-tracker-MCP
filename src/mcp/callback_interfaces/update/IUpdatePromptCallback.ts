import type { ICallback } from "../ICallback";

export interface IUpdatePromptCallback extends ICallback {
  marker?: never; // Фиктивное поле, чтобы отличать IUpdatePromptCallback от других интерфейсов
}
