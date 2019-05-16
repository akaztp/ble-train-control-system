import { SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';

export const signalLights: SimpleMap<SignalLight> = {
    40: {
        id: 40,
        state: SignalLightState.Red,
    } as SignalLight,
};

export const segment4: SimpleMap<Segment> = {
    4: {
        id: 4,
        fromPaths: [],
        fromSignalLight: signalLights[40],
        toPaths: [],
        toSignalLight: null,
    } as Segment,
};

