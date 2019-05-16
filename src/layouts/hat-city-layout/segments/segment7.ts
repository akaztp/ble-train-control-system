import { SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';

export const signalLights7: SimpleMap<SignalLight> = {
  70: {
    id: 70,
    state: SignalLightState.Red,
  } as SignalLight,
};

export const segment7: SimpleMap<Segment> = {
  7: {
    id: 7,
    fromPaths: [],
    fromSignalLight: null,
    toPaths: [],
    toSignalLight: signalLights7[70],
  } as Segment,
};

