import { layoutId } from '@layout/layout-id';
import { BroadcastAction } from '@logic/state/action';
import { PinPair } from '../../pin-pair';
import { actionToSerial, setupSerial } from '../../serial';
import { actionToTunnel, setupTunnel } from './broadcast-tunnel';

const serialPins: PinPair = {
    a: D27, // RX
    b: D28, // TX
};

const trainName = 'TR1';
let serial: Serial;
global.trainDriverDeviceId = '0:0:0:0:0:0'; // filled in by the gulp task

function main() {
    Bluetooth.setConsole(true);

    serial = Serial1;
    setupSerial(
        serial,
        serialPins,
        (action: BroadcastAction<any>) => {
            actionToTunnel(action);
        },
    );
    setupTunnel(
        layoutId,
        trainName,
        global.trainDriverDeviceId,
        (action: BroadcastAction<any>) => {
            actionToSerial(serial, action);
        },
    );
}

E.on('init', main);
