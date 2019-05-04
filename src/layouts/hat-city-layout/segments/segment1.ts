import { addPos, Pos, SimpleMap } from '@logic/models/base';
import { PlacedPrimitive, trainFrontLeft } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';
import { addSegment } from '../../utils/add-segment';
import { p2 as seg0P2 } from './segment0';
import { p2 as seg3P2 } from './segment3';

const p1: Pos = {x: seg0P2.x - 4, y: seg0P2.y - 2};
export const p2: Pos = {x: seg3P2.x + 5, y: seg0P2.y - 2};

export const signalLights1: SimpleMap<SignalLight> = {
  10: {
    id: 10,
    state: SignalLightState.Red,
  } as SignalLight,
  11: {
    id: 11,
    state: SignalLightState.Red,
  } as SignalLight,
};

export const segment1: SimpleMap<Segment> = {
  1: {
    id: 1,
    fromPaths: [],
    fromSignalLight: signalLights1[10],
    toPaths: [],
    toSignalLight: signalLights1[11],
  } as Segment,
};

export const primitives1: PlacedPrimitive[] = addSegment(
  segment1[1],
  p1,
  [
    {
      fromPos: {x: 0, y: 0},
      toPos: addPos(p2, {x: -p1.x, y: -p1.y}),
      rotation: Rotation.R0,
      primitive: Primitive.Straight,
    }, {
    fromPos: addPos(
      {x: Math.round((p1.x + p2.x) / 2), y: p2.y},
      {x: -p1.x, y: -p1.y},
    ),
    rotation: Rotation.R0,
    primitive: Primitive.TrainPresence,
    data: trainFrontLeft,
  }, {
    fromPos: {x: -1, y: 0}, rotation: Rotation.R0,
    primitive: Primitive.SignalLight,
    data: signalLights1[10],
  }, {
    fromPos: addPos(p2, {x: -p1.x + 1, y: -p1.y}),

    rotation: Rotation.R180,
    primitive: Primitive.SignalLight,
    data: signalLights1[11],
  },
  ],
);
