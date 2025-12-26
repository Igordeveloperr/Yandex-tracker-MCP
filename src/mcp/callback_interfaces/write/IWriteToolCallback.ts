import type { ICallback } from "../ICallback";

export interface IWriteToolCallback extends ICallback {
  marker?: never; // Фиктивное поле, чтобы отличать IWriteToolCallback от других интерфейсов
}
