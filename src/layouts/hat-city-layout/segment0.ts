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

export const signalLights0: SimpleMap<SignalLight> = {
  0: {
    id: 0,
    state: SignalLightState.Green,
  } as SignalLight,
  1: {
    id: 1,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment0: SimpleMap<Segment> = {
  0: {
    id: 0,
    fromPaths: [],
    fromSignalLight: signalLights0[0],
    toPaths: [],
    toSignalLight: signalLights0[1],
  } as Segment,
};

export const primitives0: PlacedPrimitive[] = addSegment(segment0[0], [
  {
    fromPos: {x: 0, y: 6}, toPos: {x: 0, y: 1}, rotation: Rotation.R270,
    primitive: Primitive.Straight,
  },
  {
    fromPos: {x: 0, y: 0}, toPos: null, rotation: Rotation.R180,
    primitive: Primitive.Diagonal,
  },
  {
    fromPos: {x: 1, y: 0}, toPos: {x: 55, y: 0}, rotation: Rotation.R0,
    primitive: Primitive.Straight,
  },
  {
    fromPos: {x: 56, y: 0}, toPos: null, rotation: Rotation.R270,
    primitive: Primitive.Diagonal,
  },
  {
    fromPos: {x: 56, y: 1}, toPos: {x: 56, y: 13}, rotation: Rotation.R90,
    primitive: Primitive.Straight,
  },
  {
    fromPos: {x: 56, y: 14}, toPos: null, rotation: Rotation.R0,
    primitive: Primitive.Diagonal,
  },
]);
