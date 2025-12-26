import type { ICallback } from "../ICallback";

export interface IDeleteToolCallback extends ICallback {
  marker?: never; // Фиктивное поле, чтобы отличать IDeleteToolCallback от других интерфейсов
}
