import { Data, Id, Pos } from '../base';
import { Primitive } from './primitive';
import { Rotation } from './rotation';
import { Segment } from './segment';

export interface PlacedPrimitive extends Data {
  id: Id;
  fromPos: Pos;
  toPos: Pos | null;
  rotation: Rotation;
  primitive: Primitive;
  data: Data | null;
  segment: Segment | null;
}
