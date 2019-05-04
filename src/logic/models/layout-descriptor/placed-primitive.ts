import { Data, Id, Pos } from '../base';
import { Primitive } from './primitive';
import { Rotation } from './rotation';
import { Segment } from '../segment';

export interface PlacedPrimitive {
  fromPos: Pos;
  toPos: Pos | null;
  rotation: Rotation;
  primitive: Primitive;
  data: Data | null;
  segment: Segment | null;
}

export const trainFrontRight = {id: 0};
export const trainFrontLeft = {id: 1};
