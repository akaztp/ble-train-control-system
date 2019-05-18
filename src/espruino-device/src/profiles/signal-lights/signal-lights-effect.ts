import {ActionType, BroadcastAction} from '@logic/state/action';
import {Effect, triggerEffectForAction} from '@logic/state/store';
import {DeviceState} from './device-state';
import {ActionPayloadSignalLight} from "@logic/state/actions/signal-light";
import {signalLightControl} from "./signal-lights-control";

const effect: Effect<DeviceState, BroadcastAction<any>> =
    (
        action: BroadcastAction<ActionPayloadSignalLight>,
        state: DeviceState,
    ): Array<BroadcastAction<any>> => {

        const {signalId, state: signalState} = action.payload;
        const pins = state.deviceConfig!.signalLights[signalId];
        if (pins) {
            signalLightControl(signalState, pins);
        }
        return [];
    };

export const signalLightsEffect: Effect<DeviceState, BroadcastAction<any>> =
    triggerEffectForAction<DeviceState, BroadcastAction<any>>(
        ActionType.SignalLight,
        effect,
    );
