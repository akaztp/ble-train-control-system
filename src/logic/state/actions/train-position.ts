import { Id } from '@logic/models/base';
import { ActionType, LocalAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainPosition {
    trainId: Id;
    segmentId: Id;
    enteringSegmentId: Id | null;
    stoppedAtSignalLight?: Id | null;
}

export function createActionTrainPosition(
    payload: ActionPayloadTrainPosition,
): LocalAction<ActionPayloadTrainPosition> {
    return localActionCreator<ActionPayloadTrainPosition>(
        ActionType.TrainPosition,
        payload,
    );
}
