import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainJoin } from '@logic/state/actions/train-join';
import { Reducer } from '@logic/state/store';
import { DeviceState } from '../device-state';

export const trainJoinReducer: Reducer<DeviceState, BroadcastAction<ActionPayloadTrainJoin>> =
    (state, action): void => {
        if (action.type === ActionType.TrainJoin) {
            {
                // TODO: needs to check if id is free
                // TODO: needs to check if target segment is free
                // TODO: needs to check if name is unique
                state.trains[action.payload.trainId] = {
                    id: action.payload.trainId,
                    name: action.payload.name,
                    seg: state.segments[action.payload.segId],
                    enterSeg: null,
                    speed: 0,
                    speedBefStop: 0,
                    driverDeviceId: null,
                    stopAtSignal: null,
                    invDir: false,
                };
            }
        }
    };
