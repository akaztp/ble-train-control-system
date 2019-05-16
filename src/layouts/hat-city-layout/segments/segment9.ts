import { SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';

export const signalLights: SimpleMap<SignalLight> = {
  90: {
    id: 90,
    state: SignalLightState.Red,
  } as SignalLight,
};

export const segment9: SimpleMap<Segment> = {
  9: {
    id: 9,
    fromPaths: [],
    fromSignalLight: null,
    toPaths: [],
    toSignalLight: signalLights[90],
  } as Segment,
};

