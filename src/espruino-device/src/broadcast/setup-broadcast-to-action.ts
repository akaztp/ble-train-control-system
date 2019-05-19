import { layoutId } from '@layout/layout-id';
import { BroadcastAction } from '@logic/state/action';
import { bleGlobals } from '@utils/ble-globals';
import { convertAdvToAction } from '@utils/convert-adv-to-action';

export function setupBroadcastToAction(
    actionHandler: (action: BroadcastAction<any>) => void,
): void {
    // @ts-ignore
    NRF.setScan(
        processAdvertisements,
        {
            filters: [
                {namePrefix: bleGlobals + layoutId},
            ],
        },
    );

    const lastActionSerials: { [key: string]: number } = {};

    function processAdvertisements(bleDevice: BluetoothDevice) {
        // @ts-ignore
        if (bleDevice.manufacturerData && bleDevice.manufacturerData.length > 0) {
            const lastSerial = lastActionSerials[
                // @ts-ignore
                bleDevice.id];
            // TODO: ignore other layout actions
            const newSerial: number = bleDevice
                // @ts-ignore
                .manufacturerData[2];
            if (newSerial !== lastSerial) {
                lastActionSerials[
                    // @ts-ignore
                    bleDevice.id] =
                    newSerial;
                // @ts-ignore
                const action = convertAdvToAction(
                    // @ts-ignore
                    bleDevice.manufacturerData,
                );
                if (action) {
                    action.isBroadcasted = true;
                    actionHandler(action);
                }
            }
        }
    }
}
