import { Id } from '@logic/models/base';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainName {
    trainId: Id;
    name: string;
}

export function createActionTrainName(
    payload: ActionPayloadTrainName,
): BroadcastAction<ActionPayloadTrainName> {
    return localActionCreator<ActionPayloadTrainName>(
        ActionType.TrainName,
        payload,
    );
}
