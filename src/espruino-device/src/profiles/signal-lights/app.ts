import { BroadcastAction } from '@logic/state/action';
import { setBleAdvertising } from '../../broadcast/action-to-broadcast';
import { setupBroadcastToAction } from '../../broadcast/setup-broadcast-to-action';
import { deviceId } from '../../globals';
import { createSignalLightsStore } from './create-store';
import { DeviceConfig } from './device-config';
import { initSignalLights } from './signal-lights-control';
import { setupTrainSensors } from './train-sensor-input';

function main() {
    Bluetooth.setConsole(true);

    const deviceConfig: DeviceConfig = {
        signalLights: {
            1: {a: D4, b: D5},
            20: {a: D2, b: D3},
            // 10: {a: D10, b: D11}
        },
        trainSensors: [
            {
                segId: 0,
                signalId: 1,
                port: D6,
            },
        ],
    };

    initSignalLights(deviceConfig.signalLights);
    const createdStore = createSignalLightsStore(deviceId, deviceConfig);

    setupTrainSensors(
        deviceConfig.trainSensors,
        createdStore.store.dispatch,
    );

    setBleAdvertising(null);

    setupBroadcastToAction(
        (action: BroadcastAction<any>) => {
            createdStore.store.dispatch(action);
        },
    );
}

E.on('init', main);
