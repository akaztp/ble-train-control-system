import { Id } from '@logic/models/base';
import { ActionType, LocalAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainChange {
    trainId: Id;
    name?: string;
    driverDevice?: string | null;
    invertedDir?: boolean;
}

export function createActionTrainChange(
    payload: ActionPayloadTrainChange,
): LocalAction<ActionPayloadTrainChange> {
    return localActionCreator<ActionPayloadTrainChange>(
        ActionType.TrainChange,
        payload,
    );
}
