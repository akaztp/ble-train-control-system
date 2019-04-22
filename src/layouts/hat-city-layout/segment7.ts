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
  70: {
    id: 70,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment7: SimpleMap<Segment> = {
  7: {
    id: 7,
    fromPaths: [],
    fromSignalLight: signalLights[70],
    toPaths: [],
    toSignalLight: null,
  } as Segment,
};

export const p1: Pos = {x: 6, y: 6};

export const primitives7: PlacedPrimitive[] = addSegment(
  segment7[7],
  p1,
  [
    {
      fromPos: {x: 0, y: 0}, toPos: {x: -3, y: 0}, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    }, {
    fromPos: {x: 0, y: 0}, toPos: null, rotation: Rotation.R0,
    primitive: Primitive.SignalLight,
    data: signalLights[70],
  },
  ],
);
