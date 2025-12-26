import type { ICallback } from "../ICallback";

export interface IWritePromptCallback extends ICallback {
  marker?: never; // Фиктивное поле, чтобы отличать IWritePromptCallback от других интерфейсов
}
