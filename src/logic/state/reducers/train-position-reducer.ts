import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainPosition } from '@logic/state/actions/train-position';
import { State } from '@logic/state/state';
import { Reducer } from '@logic/state/store';

export const trainPositionReducer: Reducer<State, BroadcastAction<ActionPayloadTrainPosition>> =
    (state, action): void => {
        if (action.type === ActionType.TrainPosition) {
            {
                let train = state.trains[action.payload.trainId];
                if (train) {
                    train.segment = state.segments[action.payload.segmentId];
                    train.enteringSegment = action.payload.enteringSegmentId !== null ?
                        state.segments[action.payload.enteringSegmentId] :
                        null;
                    train.stoppedAtSignalLight = action.payload.stoppedAtSignalLight;
                }
            }
        }
    };
