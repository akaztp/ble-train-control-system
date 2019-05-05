import { Id } from '@logic/models/base';
import { ActionType, LocalAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainSensor {
    segmentId: Id;
    signalId: Id;
    state: boolean;
}

export function createActionTrainSensor(
    payload: ActionPayloadTrainSensor,
): LocalAction<ActionPayloadTrainSensor> {
    return localActionCreator<ActionPayloadTrainSensor>(
        ActionType.TrainSensor,
        payload,
    );
}
