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
  40: {
    id: 40,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment4: SimpleMap<Segment> = {
  4: {
    id: 4,
    fromPaths: [],
    fromSignalLight: signalLights[40],
    toPaths: [],
    toSignalLight: null,
  } as Segment,
};

export const p1: Pos = {x: 6, y: 3};

export const primitives4: PlacedPrimitive[] = addSegment(
  segment4[4],
  p1,
  [
    {
      fromPos: {x: 0, y: 0}, toPos: {x: 10, y: 0}, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    }, {
    fromPos: {x: 5, y: 0}, rotation: Rotation.R0,
    primitive: Primitive.TrainPresence,
  }, {
    fromPos: {x: 1, y: 0},  rotation: Rotation.R180,
    primitive: Primitive.SignalLight,
    data: signalLights[40],
  },
  ],
);
