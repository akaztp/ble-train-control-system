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
import { setupTrainSensors } from '../../profiles/train-sensor/train-sensor-input';
import { DeviceConfig } from './device-config';

export interface StoreInterface {
}

global.logSensors = false;

function main() {
    Bluetooth.setConsole(true);

    const deviceConfig: DeviceConfig = {
        signalLights: {
            1: {a: D22, b: D23},
            20: {a: D24, b: D25},
        },
        switches: {
            7: {a: D12, b: D13},
        },
        trainSensors: [
            {segId: 0, signalId: 1, port: D2},
            {segId: 2, signalId: 20, port: D3},
        ],
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

    setupTrainSensors(
        deviceConfig.trainSensors,
        createdStore.store.dispatch,
    );

    setBleAdvertising(null);
    setupBroadcastToAction(createdStore.store.dispatch);
}

E.on('init', main);
