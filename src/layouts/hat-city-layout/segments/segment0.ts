import { SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';

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

