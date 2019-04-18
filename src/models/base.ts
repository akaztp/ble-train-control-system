export type Id = number;

export interface Pos {
  x: number;
  y: number;
}

export interface Data { id: Id; }

export interface SimpleMap<T extends Data> { [key: number]: T; }
