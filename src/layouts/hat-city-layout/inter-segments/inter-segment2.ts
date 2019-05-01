import { Pos } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../../utils/add-segment';
import { p2 as seg0P2 } from '../segments/segment0';
import { switches } from '../switches';

const pSW0: Pos = {x: seg0P2.x - 1, y: seg0P2.y};

export const interSegment2: PlacedPrimitive[] = addSegment(
  null,
  pSW0,
  [
    {
      fromPos: {x: 0, y: 0},  rotation: Rotation.R180,
      primitive: Primitive.SwitchRight,
      data: switches[7],
    },
    {
      fromPos: {x: -1, y: -1},  rotation: Rotation.R0,
      primitive: Primitive.Straight,
    },
    {
      fromPos: {x: -2, y: -2},  rotation: Rotation.R0,
      primitive: Primitive.DiagonalL,
    },  ],
);
