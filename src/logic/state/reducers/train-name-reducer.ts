import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainName } from '@logic/state/actions/train-name';
import { State } from '@logic/state/state';
import { Reducer } from '@logic/state/store';

export const trainNameReducer: Reducer<State, BroadcastAction<ActionPayloadTrainName>> =
    (state, action): void => {
        if (action.type === ActionType.TrainName) {
            {
                const train = state.trains[action.payload.trainId];
                if (train) {
                    // TODO: needs to check if name is unique
                    train.name = action.payload.name;
                }
            }
        }
    };
