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
import { setupSwitches } from '../../profiles/switch/switch-control';
import { switchesEffect } from '../../profiles/switch/switches-effect';
import { DeviceConfig } from './device-config';

export interface StoreInterface {
}

function main() {
    Bluetooth.setConsole(true);

    const deviceConfig: DeviceConfig = {
        signalLights: {
            31: {a: D4, b: D6},
            21: {a: D13, b: D15},
        },
        switches: {
            6: {a: D5, b: D7},
        },
        // trainSensors: [
        //     {
        //         segId: 0,
        //         signalId: 1,
        //         port: D6,
        //     },
        // ],
    };

    const createdStore = baseCreateStore<State<DeviceConfig>, StoreInterface, BroadcastAction<any>>(
        createInitialState<DeviceConfig>(deviceId, deviceConfig),
        [
        ],
        [
            broadcasterEffect,
            signalLightsEffect,
            switchesEffect,
        ],
        [],
        {},
    );

    setupSignalLights(deviceConfig.signalLights);

    setupSwitches(deviceConfig.switches);

    // setupTrainSensors(
    //     deviceConfig.trainSensors,
    //     createdStore.store.dispatch,
    // );

    setBleAdvertising(null);
    setupBroadcastToAction(createdStore.store.dispatch);
}

E.on('init', main);
