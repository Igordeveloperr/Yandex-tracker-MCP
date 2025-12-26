import type { ICallback } from "../ICallback";

export interface IDeletePromptCallback extends ICallback {
  marker?: never; // Фиктивное поле, чтобы отличать IDeletePromptCallback от других интерфейсов
}
