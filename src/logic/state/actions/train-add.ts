import { Id } from '@logic/models/base';
import { ActionType, LocalAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainAdd {
    trainId: Id;
    name: string;
    segmentId: Id;
}

export function createActionTrainAdd(
    payload: ActionPayloadTrainAdd,
): LocalAction<ActionPayloadTrainAdd> {
    return localActionCreator<ActionPayloadTrainAdd>(
        ActionType.TrainAdd,
        payload,
    );
}
