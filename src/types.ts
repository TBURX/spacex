export type IMap<T> = { [key: string | number]: T };

export enum DragTypes {
  PAST = "PAST",
  UPCOMING = "UPCOMING",
  RESERVED = "RESERVED",
}
