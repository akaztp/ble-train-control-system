import { Id } from '@logic/models/base';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainJoin {
    trainId: Id;
    name: string;
    segmentId: Id;
}

export function createActionTrainJoin(
    payload: ActionPayloadTrainJoin,
): BroadcastAction<ActionPayloadTrainJoin> {
    return localActionCreator<ActionPayloadTrainJoin>(
        ActionType.TrainJoin,
        payload,
    );
}
