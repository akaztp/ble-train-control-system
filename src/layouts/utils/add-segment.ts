import { addPos, Data, Pos } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { Segment } from '@logic/models/segment';

export interface PartialPlacedPrimitive {
  fromPos: Pos;
  toPos?: Pos | null;
  rotation: Rotation;
  primitive: Primitive;
  data?: Data;
}

export function addSegment(
  segment: Segment | null,
  pos: Pos = {x: 0, y: 0},
  primitives: PartialPlacedPrimitive[],
): PlacedPrimitive[] {
  return primitives.map((p) => ({
    fromPos: addPos(pos, p.fromPos),
    toPos: p.toPos ? addPos(pos, p.toPos) : null,
    rotation: p.rotation,
    primitive: p.primitive,
    data: p.data || null,
    segment,
  }));
}
