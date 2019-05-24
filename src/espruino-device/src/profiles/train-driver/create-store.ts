import { BroadcastAction } from '@logic/state/action';
import { createInitialState } from '@logic/state/create-initial-state';
import { trainAddReducer } from '@logic/state/reducers/train-add-reducer';
import { trainDriverIdReducer } from '@logic/state/reducers/train-driver-id-reducer';
import { trainInvertDirReducer } from '@logic/state/reducers/train-invert-dir-reducer';
import { trainSpeedReducer } from '@logic/state/reducers/train-speed-reducer';
import { CreatedStore, createStore as baseCreateStore } from '@logic/state/store';
import { broadcasterEffectFactory } from './broadcaster-effect';
import { DeviceConfig } from './device-config';
import { DeviceState } from './device-state';
import { trainDriverEffect } from './train-driver-effect';

export interface StoreInterface {
}

export function createTrainDriverStore(
    deviceId: string,
    deviceConfig: DeviceConfig,
    serial: Serial,
): CreatedStore<DeviceState, StoreInterface, BroadcastAction<any>> {
    return baseCreateStore<DeviceState, StoreInterface, BroadcastAction<any>>(
        createInitialState(deviceId, deviceConfig),
        [
            trainAddReducer,
            trainInvertDirReducer,
            trainSpeedReducer,
            trainDriverIdReducer,
            // trainPositionReducer,
        ],
        [
            broadcasterEffectFactory(serial),
            trainDriverEffect,
            // trainPositionCalcSensorEffect,
        ],
        [],
        {},
    );
}
