import { Id } from '@logic/models/base';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainPosition {
    trainId: Id;
    segmentId: Id;
    enteringSegmentId: Id | null;
    stoppedAtSignalLight: Id | null;
}

export function createActionTrainPosition(
    payload: ActionPayloadTrainPosition,
): BroadcastAction<ActionPayloadTrainPosition> {
    return localActionCreator<ActionPayloadTrainPosition>(
        ActionType.TrainPosition,
        payload,
    );
}
