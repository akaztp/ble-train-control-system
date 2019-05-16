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
        fromPaths: [],
        fromSignalLight: signalLights[60],
        toPaths: [],
        toSignalLight: null,
    } as Segment,
};

