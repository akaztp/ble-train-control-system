import { Id } from '@logic/models/base';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainAdd {
    trainId: Id;
    name: string;
    segmentId: Id;
}

export function createActionTrainAdd(
    payload: ActionPayloadTrainAdd,
): BroadcastAction<ActionPayloadTrainAdd> {
    return localActionCreator<ActionPayloadTrainAdd>(
        ActionType.TrainAdd,
        payload,
    );
}
