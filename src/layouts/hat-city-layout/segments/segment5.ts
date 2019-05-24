import { SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';

export const signalLights: SimpleMap<SignalLight> = {
    50: {
        id: 50,
        state: SignalLightState.Red,
    } as SignalLight,
};

export const segment5: SimpleMap<Segment> = {
    5: {
        id: 5,
        frPaths: [],
        frSignal: signalLights[50],
        toPaths: [],
        toSignal: null,
    } as Segment,
};

