import { addPos, Pos, SimpleMap } from '@logic/models/base';
import { PlacedPrimitive, trainFrontLeft } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { Segment } from '@logic/models/segment';
import {
  SignalLight,
  SignalLightState,
} from '@logic/models/signal-light';
import { addSegment } from '../../utils/add-segment';
import { p2 as seg0P2 } from './segment0';
import { p2 as seg3P2 } from './segment3';

const p1: Pos = addPos(seg0P2, {x: -2, y: 0});
const p2: Pos = {x: seg3P2.x + 2, y: seg0P2.y};

export const signalLights2: SimpleMap<SignalLight> = {
  20: {
    id: 20,
    state: SignalLightState.Red,
  } as SignalLight,
  21: {
    id: 21,
    state: SignalLightState.Red,
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
  p1,
  [
    {
      fromPos: {x: 0, y: 0},
      toPos: addPos(p2, {x: -p1.x, y: -p1.y}),
      rotation: Rotation.R0,
      primitive: Primitive.Straight,
    }, {
    fromPos: addPos({x: Math.round(p1.x + p2.x) / 2, y: p2.y}, {x: -p1.x, y: -p1.y}),
    rotation: Rotation.R0,
    primitive: Primitive.TrainPresence,
    data: trainFrontLeft,
  }, {
    fromPos: {x: -1, y: 0}, rotation: Rotation.R0,
    primitive: Primitive.SignalLight,
    data: signalLights2[20],
  }, {
    fromPos: addPos(p2, {x: -p1.x + 1, y: -p1.y}), rotation: Rotation.R180,
    primitive: Primitive.SignalLight,
    data: signalLights2[21],
  },
  ],
);
