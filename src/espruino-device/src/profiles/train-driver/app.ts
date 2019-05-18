import { BroadcastAction } from '@logic/state/action';
import { actionToBroadcast, setBleAdvertising } from '../../broadcast/action-to-broadcast';
import { setupBroadcastToAction } from '../../broadcast/setup-broadcast-to-action';
import { deviceId } from '../../globals';
import { PinPair } from '../../pin-pair';
import { actionToSerial, setupSerial } from '../../serial';
import { createTrainDriverStore } from './create-store';
import { DeviceConfig } from './device-config';
import { initTrainControl } from './motor-control';

const trainDriverPins: PinPair = {
    a: D15,
    b: D13,
};

const serialPins: PinPair = {
    a: D27, // RX
    b: D28, // TX
};

let serial: Serial;

function main() {
    Bluetooth.setConsole(true);

    serial = Serial1;
    const deviceConfig: DeviceConfig = {
        trainDriver: trainDriverPins,
    };

    initTrainControl(trainDriverPins);
    const createdStore = createTrainDriverStore(deviceId, deviceConfig, serial);

    setBleAdvertising(null);

    setupSerial(
        serial,
        serialPins,
        (action: BroadcastAction<any>) => {
            actionToBroadcast(action);
            action.isBroadcasted = true;
            createdStore.store.dispatch(action);
        },
    );

    setupBroadcastToAction(
        (action: BroadcastAction<any>) => {
            createdStore.store.dispatch(action);
            actionToSerial(serial, action);
        },
    );
}

E.on('init', main);

