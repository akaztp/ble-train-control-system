import { layoutId } from '@layout/layout-id';
import { BroadcastAction } from '@logic/state/action';
import { bleGlobals } from '@utils/ble-globals';
import { convertActionToAdv } from '@utils/convert-action-to-adv';
import { shortDeviceId } from '../globals';

const advInterval = 20;
const advSetInterval = 300;
const advQueue: Uint8ClampedArray[] = [];

function advertise() {
    if (advQueue.length) {
        const buffer = advQueue.shift()!;
        setBleAdvertising(buffer);
    }
    setTimeout(advertise, advSetInterval);
}

advertise();


export function actionToBroadcast(
    action: BroadcastAction<any>,
): void {
    const buffer = convertActionToAdv(action);
    if (buffer) {
        advQueue.push(buffer);
    }
}


export function setBleAdvertising(
    manufacturerData: Uint8ClampedArray | null,
): void {
    const options: any = {
        name: bleGlobals + layoutId + '-' + shortDeviceId,
        showName: true,
        discoverable: true,
        connectable: true,
        scannable: true,
        interval: advInterval,
    };
    if (manufacturerData && manufacturerData.length > 0) {
        options.manufacturer = 0x0590;
        options.manufacturerData = manufacturerData;
    }

    try {
        // @ts-ignore
        NRF.setAdvertising(
            {},
            options,
        );
    } catch (e) {
        console.log(e.message);
        console.log(JSON.stringify(options));
    }
}
