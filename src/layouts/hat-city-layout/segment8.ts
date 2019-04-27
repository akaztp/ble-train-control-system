import { Pos, SimpleMap } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { Segment } from '@logic/models/segment';
import {
  SignalLight,
  SignalLightState,
} from '@logic/models/signal-light';
import { addSegment } from '../utils/add-segment';

const signalLights: SimpleMap<SignalLight> = {
  80: {
    id: 80,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment8: SimpleMap<Segment> = {
  8: {
    id: 8,
    fromPaths: [],
    fromSignalLight: signalLights[80],
    toPaths: [],
    toSignalLight: null,
  } as Segment,
};

export const p1: Pos = {x: 6, y: 7};

export const primitives8: PlacedPrimitive[] = addSegment(
  segment8[8],
  p1,
  [
    {
      fromPos: {x: 0, y: 0}, toPos: {x: -3, y: 0}, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    }, {
    fromPos: {x: 0, y: 0},  rotation: Rotation.R0,
    primitive: Primitive.SignalLight,
    data: signalLights[80],
  },
  ],
);
