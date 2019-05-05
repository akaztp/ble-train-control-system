export type Id = number;

export interface Pos {
  x: number;
  y: number;
}

export function addPos(p1: Pos, p2: Pos): Pos {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
  };
}

export interface Data {
  id: Id;
}

export interface SimpleMap<T extends Data> {
  [key: number]: T;
}

export function getUniqueId(data: SimpleMap<Data>): Id {
  return Object.keys(data).reduce(
    (max, k) => {
      const id = parseInt(k, 10);
      return id >= max ? id + 1 : max;
    }, 0);
}
