import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../utils/add-segment';
import { switches } from './switches';

export const interSegments: PlacedPrimitive[] = addSegment(null, [
  {
    fromPos: {x: 0, y: 7}, toPos: null, rotation: Rotation.R270,
    primitive: Primitive.SwitchRight,
    data: switches[0],
  }, {
    fromPos: {x: 1, y: 6}, toPos: null, rotation: Rotation.R90,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: 1, y: 5}, toPos: null, rotation: Rotation.R180,
    primitive: Primitive.Diagonal,
  }, {
    fromPos: {x: 2, y: 5}, toPos: null, rotation: Rotation.R0,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: 3, y: 5}, toPos: null, rotation: Rotation.R0,
    primitive: Primitive.SwitchRight,
    data: switches[0],
  }, {
    fromPos: {x: 55, y: 14}, toPos: null, rotation: Rotation.R180,
    primitive: Primitive.SwitchRight,
    data: switches[7],
  },
]);
