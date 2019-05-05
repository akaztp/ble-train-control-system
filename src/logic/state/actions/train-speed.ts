import { Id } from '@logic/models/base';
import { ActionType, LocalAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainSpeed {
    trainId: Id;
    speed: number;
    temporary: boolean;
}

export function createActionTrainSpeed(
    payload: ActionPayloadTrainSpeed,
): LocalAction<ActionPayloadTrainSpeed> {
    return localActionCreator<ActionPayloadTrainSpeed>(
        ActionType.TrainSpeed,
        payload,
    );
}
