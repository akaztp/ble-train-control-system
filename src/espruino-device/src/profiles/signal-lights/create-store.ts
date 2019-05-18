import {BroadcastAction} from '@logic/state/action';
import {createInitialState} from '@logic/state/create-initial-state';
import {CreatedStore} from '@logic/state/store';
import {createDeviceStore, StoreInterface} from '../../store/create-store';
import {DeviceConfig} from './device-config';
import {DeviceState} from './device-state';
import {broadcasterEffect} from "./broadcaster-effect";
import {signalLightsEffect} from "./signal-lights-effect";

export function createSignalLightsStore(
    deviceId: string,
    deviceConfig: DeviceConfig,
): CreatedStore<DeviceState, StoreInterface, BroadcastAction<any>> {

    return createDeviceStore(
        createInitialState(deviceId, deviceConfig),
        [
            broadcasterEffect,
            signalLightsEffect,
        ],
    );
}
