import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainSpeed } from '@logic/state/actions/train-speed';
import { State } from '@logic/state/state';
import { Reducer } from '@logic/state/store';

export const trainSpeedReducer: Reducer<State, BroadcastAction<ActionPayloadTrainSpeed>> =
    (state, action): void => {
        if (action.type === ActionType.TrainSpeed) {
            {
                const train = state.trains[action.payload.trainId];
                if (train) {
                    const newSpeed = action.payload.speed;
                    if (newSpeed === 0) {
                        train.speedBefStop = action.payload.temp ? train.speed : 0;
                    } else {
                        train.speedBefStop = train.speed;
                    }
                    train.speed = newSpeed;
                }
            }
        }
    };
