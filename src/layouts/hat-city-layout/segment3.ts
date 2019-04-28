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
import { p1 as seg0P1, p2 as seg0P2 } from './segment0';

const p1: Pos = addPos(seg0P1, {x: 0, y: 2});
export const p2: Pos = {x: seg0P1.x + 7, y: seg0P2.y};

export const signalLights3: SimpleMap<SignalLight> = {
  30: {
    id: 30,
    state: SignalLightState.Green,
  } as SignalLight,
  31: {
    id: 31,
    state: SignalLightState.Green,
  } as SignalLight,
};

export const segment3: SimpleMap<Segment> = {
  3: {
    id: 3,
    fromPaths: [],
    fromSignalLight: signalLights3[30],
    toPaths: [],
    toSignalLight: signalLights3[31],
  } as Segment,
};

export const primitives3: PlacedPrimitive[] = addSegment(
  segment3[3],
  p1,
  [
    {
      fromPos: {x: 0, y: 0},
      toPos: {x: 0, y: p2.y - p1.y - 1},
      rotation: Rotation.R90,
      primitive: Primitive.Straight,
    }, {
    fromPos: {x: 0, y: 0}, rotation: Rotation.R270,
    primitive: Primitive.SignalLight,
    data: signalLights3[30],
  }, {
    fromPos: {x: 0, y: Math.round((p2.y - p1.y) / 2) + 1},
    rotation: Rotation.R0,
    primitive: Primitive.TrainPresence,
  }, {
    fromPos: {x: 0, y: p2.y - p1.y},
    rotation: Rotation.R90,
    primitive: Primitive.Corner,
  }, {
    fromPos: {x: 1, y: p2.y - p1.y},
    toPos: {x: p2.x - p1.x, y: p2.y - p1.y},
    rotation: Rotation.R0,
    primitive: Primitive.Straight,
  }, {
    fromPos: addPos(p2, {x: -p1.x-1, y: -p1.y}),
    rotation: Rotation.R0,
    primitive: Primitive.SignalLight,
    data: signalLights3[31],
  },
  ],
);
