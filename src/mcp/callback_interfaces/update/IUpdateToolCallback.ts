import type { ICallback } from "../ICallback";

export interface IUpdateToolCallback extends ICallback {
  marker?: never; // Фиктивное поле, чтобы отличать IUpdateToolCallback от других интерфейсов
}
