import { State } from '@logic/models/state';
import { ActionType, LocalAction } from '@logic/state/action';
import { ActionPayloadTrainChange } from '@logic/state/actions/train-change';
import { Reducer } from '@logic/state/store';

export const trainChangeReducer: Reducer<State, LocalAction<ActionPayloadTrainChange>> =
    (state, action): void => {
        if (action.type === ActionType.TrainChange) {
            {
                const train = state.trains[action.payload.id];
                if (train) {
                    const {name: newName, driverDevice: newDriverDevice} = action.payload;
                    if (newName) {
                        // TODO: needs to check if name is unique
                        train.name = newName;
                    }
                    if (newDriverDevice !== undefined) {
                        train.driverDevice = newDriverDevice;
                    }

                }
            }
        }
    };
