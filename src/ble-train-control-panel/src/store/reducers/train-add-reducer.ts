import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainAdd } from '@logic/state/actions/train-add';
import { Reducer } from '@logic/state/store';
import { DeviceState } from '../device-state';

export const trainAddReducer: Reducer<DeviceState, BroadcastAction<ActionPayloadTrainAdd>> =
    (state, action): void => {
        if (action.type === ActionType.TrainAdd) {
            {
                // TODO: needs to check if id is free
                // TODO: needs to check if target segment is free
                // TODO: needs to check if name is unique
                state.trains[action.payload.trainId] = {
                    id: action.payload.trainId,
                    name: action.payload.name,
                    segment: state.segments[action.payload.segmentId],
                    enteringSegment: null,
                    speed: 0,
                    speedBeforeStop: 0,
                    driverDeviceId: null,
                    stoppedAtSignalLight: null,
                    invertedDir: false,
                };
            }
        }
    };
