import { Id } from '@logic/models/base';
import { SignalLightState } from '@logic/models/signal-light';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadSignalLight {
    signalId: Id;
    segId: Id;
    state: SignalLightState;
}

export function createActionSignalLight(
    payload: ActionPayloadSignalLight,
): BroadcastAction<ActionPayloadSignalLight> {
    return localActionCreator<ActionPayloadSignalLight>(
        ActionType.SignalLight,
        payload,
    );
}
