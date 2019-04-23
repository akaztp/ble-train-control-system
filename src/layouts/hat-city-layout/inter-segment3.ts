import { Pos } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../utils/add-segment';
import { p2 as seg3P2 } from './segment3';
import { switches } from './switches';

const pSW0: Pos = {x: seg3P2.x + 1, y: seg3P2.y};

export const interSegment3: PlacedPrimitive[] = addSegment(
  null,
  pSW0,
  [
    {
      fromPos: {x: 0, y: 0}, rotation: Rotation.R0,
      primitive: Primitive.SwitchLeft,
      data: switches[6],
    },
    {
      fromPos: {x: 1, y: -1}, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    },
    {
      fromPos: {x: 2, y: -2}, rotation: Rotation.R0,
      primitive: Primitive.DiagonalR,
    },
    {
      fromPos: {x: 3, y: -2}, rotation: Rotation.R0,
      primitive: Primitive.SwitchLeft,
      data: switches[5],
    },
    {
      fromPos: {x: 4, y: -3}, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    },
    {
      fromPos: {x: 5, y: -4}, rotation: Rotation.R0,
      primitive: Primitive.DiagonalR,
    },
  ],
);
