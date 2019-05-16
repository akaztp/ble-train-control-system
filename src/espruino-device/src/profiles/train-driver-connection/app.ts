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

function main() {
    // @ts-ignore
    const serial = new Serial();
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
        (action: BroadcastAction<any>) => {
            actionToSerial(serial, action);
        },
    );
}

E.on('init', main);
save();
