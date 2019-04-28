import { addPos, Pos, SimpleMap } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { Segment } from '@logic/models/segment';
import {
  SignalLight,
  SignalLightState,
} from '@logic/models/signal-light';
import { addSegment } from '../utils/add-segment';
import { p2 as seg1P2 } from './segment1';

const p1: Pos = addPos(seg1P2, {x: 2, y: -2});

export const signalLights7: SimpleMap<SignalLight> = {
  70: {
    id: 70,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment7: SimpleMap<Segment> = {
  7: {
    id: 7,
    fromPaths: [],
    fromSignalLight: signalLights7[70],
    toPaths: [],
    toSignalLight: null,
  } as Segment,
};

export const primitives7: PlacedPrimitive[] = addSegment(
  segment7[7],
  p1,
  [
    {
      fromPos: {x: 0, y: 0}, toPos: {x: 7, y: 0},
      rotation: Rotation.R0,
      primitive: Primitive.Straight,
    }, {
    fromPos: {x: 4, y: 0},
    rotation: Rotation.R0,
    primitive: Primitive.TrainPresence,
  }, {
    fromPos: {x: 1, y: 0}, rotation: Rotation.R180,
    primitive: Primitive.SignalLight,
    data: signalLights7[70],
  },
  ],
);
