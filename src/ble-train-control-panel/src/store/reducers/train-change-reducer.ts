import { State } from '@logic/models/state';
import { ActionType, LocalAction } from '@logic/state/action';
import { ActionPayloadTrainChange } from '@logic/state/actions/train-change';
import { Reducer } from '@logic/state/store';

export const trainChangeReducer: Reducer<State, LocalAction<ActionPayloadTrainChange>> =
    (state, action): void => {
        if (action.type === ActionType.TrainChange) {
            {
                const train = state.trains[action.payload.trainId];
                if (train) {
                    const {
                        name: newName,
                        driverDevice: newDriverDevice,
                        invertedDir: newInvertedDir,
                    } = action.payload;
                    if (newName) {
                        // TODO: needs to check if name is unique
                        train.name = newName;
                    }
                    if (newDriverDevice !== undefined) {
                        if (newDriverDevice === null || (train.speed === 0 && !train.stoppedAtSignalLight)) {
                            train.driverDevice = newDriverDevice;
                            train.speedBeforeStop = 0;
                        }
                    }

                    if (newInvertedDir !== undefined) {
                        if (train.speed === 0 && !train.stoppedAtSignalLight) {
                            train.speedBeforeStop = 0;
                            train.invertedDir = newInvertedDir;
                        }
                    }
                }
            }
        }
    };
