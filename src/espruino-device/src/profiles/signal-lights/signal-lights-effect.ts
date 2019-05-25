import { SignalLightsConfig } from '@logic/models/device-configs';
import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadSignalLight } from '@logic/state/actions/signal-light';
import { State } from '@logic/state/state';
import { Effect, triggerEffectForAction } from '@logic/state/store';
import { PinPair } from '../../pin-pair';
import { signalLightControl } from './signal-lights-control';

const effect: Effect<State<SignalLightsConfig<PinPair>>, BroadcastAction<any>> =
    (
        action: BroadcastAction<ActionPayloadSignalLight>,
        state: State<SignalLightsConfig<PinPair>>,
    ): Array<BroadcastAction<any>> => {
        const {signalId, state: signalState} = action.payload;
        const pins = state.deviceConfig.signalLights[signalId];
        if (pins) {
            signalLightControl(signalState, pins);
        }
        return [];
    };

export const signalLightsEffect: Effect<State<SignalLightsConfig<PinPair>>, BroadcastAction<any>> =
    triggerEffectForAction<State<SignalLightsConfig<PinPair>>, BroadcastAction<any>>(
        ActionType.SignalLight,
        effect,
    );
