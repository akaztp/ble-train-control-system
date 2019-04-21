import { Data, Pos, SimpleMap } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { Segment } from '@logic/models/layout-descriptor/segment';
import {
  SignalLight,
  SignalLightState,
} from '@logic/models/layout-descriptor/signal-light';
import { addSegment } from '../utils/add-segment';
import { switches } from './switches';

export const signalLights: SimpleMap<SignalLight> = {
  10: {
    id: 10,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment1: SimpleMap<Segment> = {
  1: {
    id: 1,
    paths: [
      {
        fromSegmentId: 1,
        fromSignal: signalLights[10],
        toSegmentId: 2,
        switchesStates: [switches[0]],
      },
    ],
  } as Segment,
};

export const primitives1: PlacedPrimitive[] = addSegment(segment1[1], [
  {
    fromPos: {x: 55, y: 14}, toPos: null, rotation: Rotation.R180,
    primitive: Primitive.SwitchRight,
    data: switches[1],
  },
  {
    fromPos: {x: 54, y: 14}, toPos: {x: 1, y: 14}, rotation: Rotation.R0,
    primitive: Primitive.Straight,
  },
  {
    fromPos: {x: 0, y: 14}, toPos: null, rotation: Rotation.R90,
    primitive: Primitive.Diagonal,
  },
  {
    fromPos: {x: 0, y: 13}, toPos: {x: 0, y: 8}, rotation: Rotation.R270,
    primitive: Primitive.Straight,
  },
]);
