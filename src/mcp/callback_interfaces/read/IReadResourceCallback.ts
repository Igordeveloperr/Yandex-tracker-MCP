import type { ICallback } from "../ICallback";

export interface IReadResourceCallback extends ICallback {
  marker?: never; // Фиктивное поле, чтобы отличать IReadResourceCallback от других интерфейсов
}
