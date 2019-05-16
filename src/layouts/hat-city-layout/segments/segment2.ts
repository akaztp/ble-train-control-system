import { SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';

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

