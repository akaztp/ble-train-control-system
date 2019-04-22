import { Pos, SimpleMap } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { Segment } from '@logic/models/layout-descriptor/segment';
import {
  SignalLight,
  SignalLightState,
} from '@logic/models/layout-descriptor/signal-light';
import { addSegment } from '../utils/add-segment';

const signalLights: SimpleMap<SignalLight> = {
  60: {
    id: 60,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment6: SimpleMap<Segment> = {
  6: {
    id: 6,
    fromPaths: [],
    fromSignalLight: signalLights[60],
    toPaths: [],
    toSignalLight: null,
  } as Segment,
};

export const p1: Pos = {x: 13, y: 6};

export const primitives6: PlacedPrimitive[] = addSegment(
  segment6[6],
  p1,
  [
    {
      fromPos: {x: 0, y: 0}, toPos: {x: 9, y: 0}, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    }, {
    fromPos: {x: 1, y: 0}, toPos: null, rotation: Rotation.R180,
    primitive: Primitive.SignalLight,
    data: signalLights[60],
  },
  ],
);
