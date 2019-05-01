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

export const signalLights0: SimpleMap<SignalLight> = {
  0: {
    id: 0,
    state: SignalLightState.Red,
  } as SignalLight,
  1: {
    id: 1,
    state: SignalLightState.Red,
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

const h1 = 5;
const h2 = 13;
const w = 28;
export const p1: Pos = {x: 1, y: h1};
export const p2: Pos = addPos(p1, {x: w - 3, y: h2 - h1});

export const primitives0: PlacedPrimitive[] = addSegment(
  segment0[0],
  p1,
  [
  {
    fromPos: {x: 0, y: 0}, toPos: {x: 0, y: 2 - h1}, rotation: Rotation.R270,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: 0, y: -1},  rotation: Rotation.R90,
    primitive: Primitive.SignalLight,
    data: signalLights0[0],
  }, {
    fromPos: {x: 0, y: 1 - h1},  rotation: Rotation.R180,
    primitive: Primitive.Corner,
  }, {
    fromPos: {x: 1, y: 1 - h1}, toPos: {x: w - 2 , y: 1 - h1}, rotation: Rotation.R0,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: Math.round((w -  1) / 2), y: 1 - h1}, rotation: Rotation.R0,
    primitive: Primitive.TrainPresence,
  }, {
    fromPos: {x: w - 1, y: 1 - h1},  rotation: Rotation.R270,
    primitive: Primitive.Corner,
  }, {
    fromPos: {x: w - 1, y: 2 - h1}, toPos: {x: w - 1, y: h2 - h1 - 1}, rotation: Rotation.R90,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: w - 1, y: h2 - h1},  rotation: Rotation.R0,
    primitive: Primitive.Corner,
  }, {
    fromPos: {x: w - 2, y: h2 - h1},
    toPos: addPos(p2, {x: -p1.x, y: -p1.y}),
    rotation: Rotation.R0,
    primitive: Primitive.Straight,
  }, {
    fromPos: {x: w - 2, y: h2 - h1},  rotation: Rotation.R180,
    primitive: Primitive.SignalLight,
    data: signalLights0[1],
  },
]);
