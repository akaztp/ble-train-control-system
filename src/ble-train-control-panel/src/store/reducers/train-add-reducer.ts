import { State } from '@logic/models/state';
import { ActionType, LocalAction } from '@logic/state/action';
import { ActionPayloadTrainAdd } from '@logic/state/actions/train-add';
import { Reducer } from '@logic/state/store';

export const trainAddReducer: Reducer<State, LocalAction<ActionPayloadTrainAdd>> =
    (state, action): void => {
        if (action.type === ActionType.TrainAdd) {
            {
                // TODO: needs to check if id is free
                // TODO: needs to check if target segment is free
                // TODO: needs to check if name is unique
                state.trains[action.payload.id] = {
                    id: action.payload.id,
                    name: action.payload.name,
                    segment: state.segments[action.payload.segmentId],
                    enteringSegment: null,
                    speed: 0,
                    speedBeforeStop: 0,
                    driverDevice: null,
                    stoppedAtSignalLight: null,
                    invertedDir: false,
                };
            }
        }
    };
