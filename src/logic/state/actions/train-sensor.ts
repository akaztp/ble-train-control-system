import { Id } from '@logic/models/base';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainSensor {
    signalId: Id;
    segId: Id;
    state: boolean;
}

export function createActionTrainSensor(
    payload: ActionPayloadTrainSensor,
): BroadcastAction<ActionPayloadTrainSensor> {
    return localActionCreator<ActionPayloadTrainSensor>(
        ActionType.TrainSensor,
        payload,
    );
}
