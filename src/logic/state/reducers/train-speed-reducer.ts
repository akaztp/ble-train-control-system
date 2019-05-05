import { State } from '@logic/models/state';
import { ActionType, LocalAction } from '@logic/state/action';
import { ActionPayloadTrainSpeed } from '@logic/state/actions/train-speed';
import { Reducer } from '@logic/state/store';

export const trainSpeedReducer: Reducer<State, LocalAction<ActionPayloadTrainSpeed>> =
    (state, action): void => {
        if (action.type === ActionType.TrainSpeed) {
            {
                const train = state.trains[action.payload.trainId];
                if (train) {
                    const newSpeed = action.payload.speed;
                    if (newSpeed === 0) {
                        train.speedBeforeStop = action.payload.temporary ? train.speed : 0;
                    } else {
                        train.speedBeforeStop = train.speed;
                    }
                    train.speed = newSpeed;
                }
            }
        }
    };
