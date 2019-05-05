import { Id } from '@logic/models/base';
import { SignalLightState } from '@logic/models/signal-light';
import { ActionType, LocalAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadSignalLight {
    segmentId: Id;
    signalId: Id;
    state: SignalLightState;
}

export function createActionSignalLight(
    payload: ActionPayloadSignalLight,
): LocalAction<ActionPayloadSignalLight> {
    return localActionCreator<ActionPayloadSignalLight>(
        ActionType.SignalLight,
        payload,
    );
}
