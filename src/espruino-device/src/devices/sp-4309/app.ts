import { BroadcastAction } from '@logic/state/action';
import { createInitialState } from '@logic/state/create-initial-state';
import { State } from '@logic/state/state';
import { createStore as baseCreateStore } from '@logic/state/store';
import { setBleAdvertising } from '../../broadcast/action-to-broadcast';
import { broadcasterEffect } from '../../broadcast/broadcaster-effect';
import { setupBroadcastToAction } from '../../broadcast/setup-broadcast-to-action';
import { deviceId } from '../../globals';
import { setupSignalLights } from '../../profiles/signal-lights/signal-lights-control';
import { signalLightsEffect } from '../../profiles/signal-lights/signal-lights-effect';
import { setupTrainSensors } from '../../profiles/train-sensor/train-sensor-input';
import { DeviceConfig } from './device-config';

export interface StoreInterface {
}

function main() {
    Bluetooth.setConsole(true);

    const deviceConfig: DeviceConfig = {
        signalLights: {
            1: {a: D12, b: D13},
            20: {a: D14, b: D15},
        },
        // switches: {
        //     6: {a: D5, b: D7},
        //     7: {a: D12, b: D14},
        // },
        trainSensors: [
            {
                segId: 0,
                signalId: 1,
                port: D2,
            },
        ],
    };

    setupSignalLights(deviceConfig.signalLights);

    const createdStore = baseCreateStore<State<DeviceConfig>, StoreInterface, BroadcastAction<any>>(
        createInitialState<DeviceConfig>(deviceId, deviceConfig),
        [
            // signalLightReducer,
        ],
        [
            broadcasterEffect,
            signalLightsEffect,
            // switchesEffect,
        ],
        [],
        {},
    );

    setupTrainSensors(
        deviceConfig.trainSensors,
        createdStore.store.dispatch,
    );

    // setupSwitches(deviceConfig.switches);

    setBleAdvertising(null);
    setupBroadcastToAction(createdStore.store.dispatch);
}

E.on('init', main);
