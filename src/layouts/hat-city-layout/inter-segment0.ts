import { Pos } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../utils/add-segment';
import { p1 as seg0P1 } from './segment0';
import { p1 as seg4P1 } from './segment4';
import { p1 as seg5P1 } from './segment5';
import { switches } from './switches';

const pSW0: Pos = {x: seg0P1.x, y: seg0P1.y + 1};
const pSW1: Pos = {x: seg4P1.x - pSW0.x - 1, y: seg4P1.y - pSW0.y};
const pSW2: Pos = {x: seg5P1.x - pSW0.x - 1, y: seg5P1.y - pSW0.y};

export const interSegment0: PlacedPrimitive[] = addSegment(
  null,
  pSW0,
  [
    {
      fromPos: {x: 0, y: 0}, toPos: null, rotation: Rotation.R270,
      primitive: Primitive.SwitchRight,
      data: switches[0],
    }, {
    fromPos: {x: 1, y: -1}, toPos: {x: 1, y: pSW1.y + 1}, rotation: Rotation.R90,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: 1, y: pSW1.y}, toPos: null, rotation: Rotation.R180,
    primitive: Primitive.Diagonal,
  }, {
    fromPos: {x: 2, y: pSW1.y}, toPos: {x: pSW1.x - 1, y: pSW1.y}, rotation: Rotation.R0,
    primitive: Primitive.Straight,
  }, {
    fromPos: pSW1, toPos: null, rotation: Rotation.R0,
    primitive: Primitive.SwitchRight,
    data: switches[1],
  }, {
    fromPos: {x: pSW1.x+1, y: pSW1.y+1}, toPos: {x: pSW2.x-2, y: pSW1.y+1}, rotation: Rotation.R0,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: pSW2.x-1, y: pSW1.y+1}, toPos: null, rotation: Rotation.R270,
    primitive: Primitive.Diagonal,
  }, {
    fromPos: pSW2, toPos: null, rotation: Rotation.R0,
    primitive: Primitive.SwitchRight,
    data: switches[2],
  },
  ],
);
