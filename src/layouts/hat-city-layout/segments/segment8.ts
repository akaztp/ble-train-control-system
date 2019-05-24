import { SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';

export const signalLights: SimpleMap<SignalLight> = {
  80: {
    id: 80,
    state: SignalLightState.Red,
  } as SignalLight,
};

export const segment8: SimpleMap<Segment> = {
  8: {
    id: 8,
      frPaths: [],
      frSignal: null,
    toPaths: [],
      toSignal: signalLights[80],
  } as Segment,
};

