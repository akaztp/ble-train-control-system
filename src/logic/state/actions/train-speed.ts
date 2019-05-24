import { Id } from '@logic/models/base';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainSpeed {
    trainId: Id;
    speed: number;
    temp: boolean;
}

export function createActionTrainSpeed(
    payload: ActionPayloadTrainSpeed,
): BroadcastAction<ActionPayloadTrainSpeed> {
    return localActionCreator<ActionPayloadTrainSpeed>(
        ActionType.TrainSpeed,
        payload,
    );
}
