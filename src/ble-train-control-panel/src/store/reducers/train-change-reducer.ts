import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainChange } from '@logic/state/actions/train-change';
import { Reducer } from '@logic/state/store';
import { DeviceState } from '../device-state';

export const trainChangeReducer: Reducer<DeviceState, BroadcastAction<ActionPayloadTrainChange>> =
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
                        if (train.speed === 0 && !train.stoppedAtSignalLight) {
                            train.driverDeviceId = newDriverDevice;
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
