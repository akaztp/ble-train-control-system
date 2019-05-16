import { BroadcastAction } from '@logic/state/action';
import { actionToBroadcast, setBleAdvertising } from '../../broadcast/action-to-broadcast';
import { setupBroadcastToAction } from '../../broadcast/setup-broadcast-to-action';
import { deviceId } from '../../globals';
import { PinPair } from '../../pin-pair';
import { actionToSerial, setupSerial } from '../../serial';
import { createTrainDriverStore } from './create-store';
import { DeviceConfig } from './device-config';

const trainDriverPins: PinPair = {
    a: D15,
    b: D13,
};

const serialPins: PinPair = {
    a: D27, // RX
    b: D28, // TX
};


function main() {
    console.log('Starting!');
    // @ts-ignore
    const serial = new Serial();

    const deviceConfig: DeviceConfig = {
        trainDriver: trainDriverPins,
    };
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
save();
