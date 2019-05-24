import { Id } from '@logic/models/base';
import { ActionType, BroadcastAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadTrainAdd {
    trainId: Id;
    segId: Id;
    driverDeviceId: string | null;
}

export function createActionTrainAdd(
    payload: ActionPayloadTrainAdd,
): BroadcastAction<ActionPayloadTrainAdd> {
    return localActionCreator<ActionPayloadTrainAdd>(
        ActionType.TrainAdd,
        payload,
    );
}
