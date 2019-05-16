import { Id, SimpleMap } from '@logic/models/base';
import { ActionType, BroadcastAction, isActionOfType } from '@logic/state/action';
import { ActionPayloadTrainAdd } from '@logic/state/actions/train-add';
import { State } from '@logic/state/state';
import { Effect } from '@logic/state/store';
import { ConnectedTrain } from '../action-sources/ble-connection-client';
import { DeviceState } from '../device-state';

export const broadcasterEffectFactory: (
    connectedTrains: SimpleMap<ConnectedTrain>,
) => Effect<DeviceState, BroadcastAction<any>> =
    (connectedTrains) => (action, state) => broadcasterEffect(action, state, connectedTrains);

function broadcasterEffect(
    action: BroadcastAction<any>,
    state: State,
    connectedTrains: SimpleMap<ConnectedTrain>,
): Array<BroadcastAction<any>> {
    if (!action.isBroadcasted) {
        let trainId: Id | null = null;
        if (isActionOfType<ActionPayloadTrainAdd>(action, ActionType.TrainAdd)) {
            trainId = action.payload.trainId;
        }
        let connectedTrain: ConnectedTrain | null = null;
        if (trainId) {
            connectedTrain = connectedTrains[trainId];
        } else {
            const trainIds = Object.keys(connectedTrains);
            if (trainIds && trainIds.length) {
                connectedTrain = connectedTrains[trainIds[0] as any];
            }
        }
        if (connectedTrain) {
            connectedTrain.sendAction(action);
            action.isBroadcasted = true;
        }
    }
    return [];
}
