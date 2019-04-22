import { SimpleMap } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { Segment } from '@logic/models/layout-descriptor/segment';
import {
  SignalLight,
  SignalLightState,
} from '@logic/models/layout-descriptor/signal-light';
import { addSegment } from '../utils/add-segment';

export const signalLights2: SimpleMap<SignalLight> = {
  20: {
    id: 20,
    state: SignalLightState.Green,
  } as SignalLight,
  21: {
    id: 21,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment2: SimpleMap<Segment> = {
  2: {
    id: 2,
    fromPaths: [],
    fromSignalLight: signalLights2[20],
    toPaths: [],
    toSignalLight: signalLights2[21],
  } as Segment,
};

export const primitives2: PlacedPrimitive[] = addSegment(
  segment2[2],
  undefined,
  [
    {
      fromPos: {x: 24, y: 14}, toPos: {x: 15, y: 14}, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    },
  ],
);
