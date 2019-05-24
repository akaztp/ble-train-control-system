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
                    train.seg = state.segments[action.payload.segId];
                    train.enterSeg = action.payload.enterSegId !== null ?
                        state.segments[action.payload.enterSegId] :
                        null;
                    train.stopAtSignal = action.payload.stopAtSignal;
                }
            }
        }
    };
