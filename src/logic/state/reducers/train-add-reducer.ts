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
                    segment: state.segments[action.payload.segmentId],
                    enteringSegment: null,
                    speed: 0,
                    speedBeforeStop: 0,
                    driverDeviceId: action.payload.driverDeviceId,
                    stoppedAtSignalLight: null,
                    invertedDir: false,
                };
            }
        }
    };
