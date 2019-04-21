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
  50: {
    id: 50,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment5: SimpleMap<Segment> = {
  5: {
    id: 5,
    fromPaths: [],
    fromSignalLight: signalLights[50],
    toPaths: [],
    toSignalLight: null,
  } as Segment,
};

export const p1: Pos = {x: 8, y: 4};

export const primitives5: PlacedPrimitive[] = addSegment(
  segment5[5],
  p1,
  [
    {
      fromPos: {x: 0, y: 0}, toPos: {x: 12, y: 0}, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    }, {
    fromPos: {x: 1, y: 0}, toPos: null, rotation: Rotation.R180,
    primitive: Primitive.SignalLight,
    data: signalLights[50],
  },
  ],
);