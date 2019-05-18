import { Id } from '@logic/models/base';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainDriverId {
    trainId: Id;
    driverDeviceId: string | null;
}

export function createActionTrainDriverId(
    payload: ActionPayloadTrainDriverId,
): BroadcastAction<ActionPayloadTrainDriverId> {
    return localActionCreator<ActionPayloadTrainDriverId>(
        ActionType.TrainDriverId,
        payload,
    );
}
