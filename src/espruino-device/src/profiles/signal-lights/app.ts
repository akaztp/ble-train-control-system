import {BroadcastAction} from '@logic/state/action';
import {setBleAdvertising} from '../../broadcast/action-to-broadcast';
import {setupBroadcastToAction} from '../../broadcast/setup-broadcast-to-action';
import {deviceId} from '../../globals';
import {createSignalLightsStore} from './create-store';
import {DeviceConfig} from './device-config';
import {initSignalLights} from "./signal-lights-control";

function main() {
    Bluetooth.setConsole(true);

    const deviceConfig: DeviceConfig = {
        signalLights: {
            1: {a: D10, b: D11},
            10: {a: D10, b: D11},
            20: {a: D10, b: D11}
        },
    };

    initSignalLights(deviceConfig.signalLights);
    const createdStore = createSignalLightsStore(deviceId, deviceConfig);

    setBleAdvertising(null);

    setupBroadcastToAction(
        (action: BroadcastAction<any>) => {
            createdStore.store.dispatch(action);
        },
    );
}

E.on('init', main);
