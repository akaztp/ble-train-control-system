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

export const signalLights1: SimpleMap<SignalLight> = {
  10: {
    id: 10,
    state: SignalLightState.Green,
  } as SignalLight,
  11: {
    id: 11,
    state: SignalLightState.Green,
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
  undefined,
  [
  {
    fromPos: {x: 24, y: 12}, toPos: {x: 15, y: 12}, rotation: Rotation.R0,
    primitive: Primitive.Straight,
  },
]);
