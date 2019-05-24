import { SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';

export const signalLights: SimpleMap<SignalLight> = {
    60: {
        id: 60,
        state: SignalLightState.Red,
    } as SignalLight,
};

export const segment6: SimpleMap<Segment> = {
    6: {
        id: 6,
        frPaths: [],
        frSignal: signalLights[60],
        toPaths: [],
        toSignal: null,
    } as Segment,
};

