import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainAdd } from '@logic/state/actions/train-add';
import { State } from '@logic/state/state';
import { Reducer } from '@logic/state/store';

export const trainAddReducer: Reducer<State, BroadcastAction<ActionPayloadTrainAdd>> =
    (state, action): void => {
        if (action.type === ActionType.TrainAdd) {
            {
                state.trains[action.payload.trainId] = {
                    id: action.payload.trainId,
                    name: '',
                    seg: state.segments[action.payload.segId],
                    enterSeg: null,
                    speed: 0,
                    speedBefStop: 0,
                    driverDeviceId: action.payload.driverDeviceId,
                    stopAtSignal: null,
                    invDir: false,
                };
            }
        }
    };
