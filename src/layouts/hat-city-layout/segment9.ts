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
  90: {
    id: 90,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment9: SimpleMap<Segment> = {
  9: {
    id: 9,
    fromPaths: [],
    fromSignalLight: signalLights[90],
    toPaths: [],
    toSignalLight: null,
  } as Segment,
};

export const p1: Pos = {x: 8, y: 9};

export const primitives9: PlacedPrimitive[] = addSegment(
  segment9[9],
  p1,
  [
    {
      fromPos: {x: 0, y: 0}, toPos: {x: -5, y: 0}, rotation: Rotation.R0,
      primitive: Primitive.Straight,
    }, {
    fromPos: {x: -4, y: 0}, rotation: Rotation.R0,
    primitive: Primitive.TrainPresence,
  }, {
    fromPos: {x: -2, y: 0},  rotation: Rotation.R0,
    primitive: Primitive.SignalLight,
    data: signalLights[90],
  },
  ],
);
