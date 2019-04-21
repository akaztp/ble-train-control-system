import { addPos, Pos, SimpleMap } from '@logic/models/base';
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

const h1 = 4;
const h2 = 8;
const w = 30;
export const p1: Pos = {x: 0, y: h1 - 1};
export const p2: Pos = addPos(p1, {x: w - 2, y: h2 - h1});

export const primitives0: PlacedPrimitive[] = addSegment(
  segment0[0],
  p1,
  [
  {
    fromPos: {x: 0, y: 0}, toPos: {x: 0, y: 2 - h1}, rotation: Rotation.R270,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: 0, y: -1}, toPos: null, rotation: Rotation.R90,
    primitive: Primitive.SignalLight,
    data: signalLights0[0],
  }, {
    fromPos: {x: 0, y: 1 - h1}, toPos: null, rotation: Rotation.R180,
    primitive: Primitive.Diagonal,
  }, {
    fromPos: {x: 1, y: 1 - h1}, toPos: {x: w - 2 , y: 1 - h1}, rotation: Rotation.R0,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: w - 1, y: 1 - h1}, toPos: null, rotation: Rotation.R270,
    primitive: Primitive.Diagonal,
  }, {
    fromPos: {x: w - 1, y: 2 - h1}, toPos: {x: w - 1, y: h2 - h1 - 1}, rotation: Rotation.R90,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: w - 1, y: h2 - h1}, toPos: null, rotation: Rotation.R0,
    primitive: Primitive.Diagonal,
  }, {
    fromPos: {x: w - 2, y: h2 - h1}, toPos: null, rotation: Rotation.R0,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: w - 2, y: h2 - h1}, toPos: null, rotation: Rotation.R180,
    primitive: Primitive.SignalLight,
    data: signalLights0[1],
  },
]);
