import { Pos } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../utils/add-segment';
import { p1 as seg6P1 } from './segment6';
import { switches } from './switches';

const pSW0: Pos = {x: seg6P1.x - 1, y: seg6P1.y};

export const interSegment1: PlacedPrimitive[] = addSegment(
  null,
  pSW0,
  [
    {
      fromPos: {x: -1, y: 1}, toPos: null, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    },
    {
      fromPos: {x: -2, y: 1}, toPos: null, rotation: Rotation.R0,
      primitive: Primitive.DiagonalR,
    },
    {
      fromPos: {x: -3, y: 2}, toPos: null, rotation: Rotation.R180,
      primitive: Primitive.SwitchRight,
      data: switches[4],
    },
    {
      fromPos: {x: -4, y: 1}, toPos: null, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    },
    {
      fromPos: {x: -5, y: 0}, toPos: null, rotation: Rotation.R0,
      primitive: Primitive.DiagonalL,
    },
  ],
);
