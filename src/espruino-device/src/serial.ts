import { BroadcastAction } from '@logic/state/action';
import { convertActionToAdv } from '@utils/convert-action-to-adv';
import { convertAdvToAction } from '@utils/convert-adv-to-action';
import { PinPair } from './pin-pair';

export function setupSerial(
    serial: Serial,
    serialPins: PinPair,
    actionHandler: (action: BroadcastAction<any>) => void,
): void {
    serial.setup(115200, {
        rx: serialPins.a,
        tx: serialPins.b,
    });
    serial.on('data', serialRxHandler);

    let buffer = '';

    function serialRxHandler(data: string): void {
        // console.log('Serial:', JSON.stringify(data));
        buffer += data;
        let idx: number;
        let line: string;
        while ((idx = buffer.indexOf('\n')) >= 0) {
            line = buffer.substr(0, idx);
            buffer = buffer.substr(idx + 1);
            if (line) {
                let action = convertSerialDataToAction(line);
                if (action) {
                    actionHandler(action);
                }
            }
        }
    }
}

export function actionToSerial(serial: Serial, action: BroadcastAction<any>): void {
    serial.print(convertActionToAdv(action) + '\n');
}

export function convertSerialDataToAction(line: string): BroadcastAction<any> | null {
    const stringData = line.split(',');
    const data = stringData.map(s => parseInt(s, 10));
    let action: BroadcastAction<any> | null = null;
    if (data.length > 0) {
        action = convertAdvToAction(new Uint8ClampedArray(data));
        if (action) {
            action.isBroadcasted = false;
        }
    }
    return action;
}
