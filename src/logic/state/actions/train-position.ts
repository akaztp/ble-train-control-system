import { Id } from '@logic/models/base';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainPosition {
    trainId: Id;
    segId: Id;
    enterSegId: Id | null;
    stopAtSignal: Id | null;
}

export function createActionTrainPosition(
    payload: ActionPayloadTrainPosition,
): BroadcastAction<ActionPayloadTrainPosition> {
    return localActionCreator<ActionPayloadTrainPosition>(
        ActionType.TrainPosition,
        payload,
    );
}
