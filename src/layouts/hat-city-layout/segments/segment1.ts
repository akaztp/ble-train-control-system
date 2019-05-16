import { SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';

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

