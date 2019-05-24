import { Id } from '@logic/models/base';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainInvertDir {
    trainId: Id;
    invDir: boolean;
}

export function createActionTrainInvertDir(
    payload: ActionPayloadTrainInvertDir,
): BroadcastAction<ActionPayloadTrainInvertDir> {
    return localActionCreator<ActionPayloadTrainInvertDir>(
        ActionType.TrainInvertDir,
        payload,
    );
}
