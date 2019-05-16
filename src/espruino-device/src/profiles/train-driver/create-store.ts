import { BroadcastAction } from '@logic/state/action';
import { createInitialState } from '@logic/state/create-initial-state';
import { CreatedStore } from '@logic/state/store';
import { createDeviceStore, StoreInterface } from '../../store/create-store';
import { broadcasterEffectFactory } from './broadcaster-effect';
import { DeviceConfig } from './device-config';
import { DeviceState } from './device-state';

export function createTrainDriverStore(
    deviceId: string,
    deviceConfig: DeviceConfig,
    serial: Serial,
): CreatedStore<DeviceState, StoreInterface, BroadcastAction<any>> {
    broadcasterEffectFactory(serial);

    return createDeviceStore(
        createInitialState(deviceId, deviceConfig),
        [
            broadcasterEffectFactory(serial),
        ],
    );
}
