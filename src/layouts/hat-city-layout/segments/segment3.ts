import { SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';

export const signalLights3: SimpleMap<SignalLight> = {
  30: {
    id: 30,
    state: SignalLightState.Red,
  } as SignalLight,
  31: {
    id: 31,
    state: SignalLightState.Red,
  } as SignalLight,
};

export const segment3: SimpleMap<Segment> = {
  3: {
    id: 3,
      frPaths: [],
      frSignal: signalLights3[31],
    toPaths: [],
      toSignal: signalLights3[30],
  } as Segment,
};

