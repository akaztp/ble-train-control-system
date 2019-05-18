import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainDriverId } from '@logic/state/actions/train-driver-id';
import { State } from '@logic/state/state';
import { Reducer } from '@logic/state/store';

export const trainDriverIdReducer: Reducer<State, BroadcastAction<ActionPayloadTrainDriverId>> =
    (state, action): void => {
        if (action.type === ActionType.TrainDriverId) {
            {
                const train = state.trains[action.payload.trainId];
                if (train) {
                    if (train.speed === 0 && !train.stoppedAtSignalLight) {
                        train.driverDeviceId = action.payload.driverDeviceId;
                        train.speedBeforeStop = 0;
                    }
                }
            }
        }
    };
