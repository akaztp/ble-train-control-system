import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainInvertDir } from '@logic/state/actions/train-invert-dir';
import { State } from '@logic/state/state';
import { Reducer } from '@logic/state/store';

export const trainInvertDirReducer: Reducer<State, BroadcastAction<ActionPayloadTrainInvertDir>> =
    (state, action): void => {
        if (action.type === ActionType.TrainInvertDir) {
            {
                const train = state.trains[action.payload.trainId];
                if (train) {
                    if (train.speed === 0 && !train.stoppedAtSignalLight) {
                        train.speedBeforeStop = 0;
                        train.invertedDir = action.payload.invertedDir;
                    }
                }
            }
        }
    };
