import { BroadcastAction } from '@logic/state/action';
import { createInitialState } from '@logic/state/create-initial-state';
import { signalLightReducer } from '@logic/state/reducers/signal-light-reducer';
import { CreatedStore, createStore as baseCreateStore } from '@logic/state/store';
import { broadcasterEffect } from './broadcaster-effect';
import { DeviceConfig } from './device-config';
import { DeviceState } from './device-state';
import { signalLightsEffect } from './signal-lights-effect';

export interface StoreInterface {
}

export function createSignalLightsStore(
    deviceId: string,
    deviceConfig: DeviceConfig,
): CreatedStore<DeviceState, StoreInterface, BroadcastAction<any>> {

    return baseCreateStore<DeviceState, StoreInterface, BroadcastAction<any>>(
        createInitialState<DeviceConfig>(deviceId, deviceConfig),
        [
            signalLightReducer,
        ],
        [
            broadcasterEffect,
            signalLightsEffect,
        ],
        [],
        {},
    );
}
