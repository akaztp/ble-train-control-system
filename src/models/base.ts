export type Id = number;

export interface Pos {
  x: number,
  y: number,
}

export type Data = { id: Id };

export type SimpleMap<T extends Data> = { [id: Id]: T };
