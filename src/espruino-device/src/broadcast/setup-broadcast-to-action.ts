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
        let action: BroadcastAction<any> | null = null;
        const lastSerial = lastActionSerials[
            // @ts-ignore
            bleDevice.id];
        if (lastSerial) {
            // TODO: ignore other layout actions
            const newSerial: number = bleDevice
                // @ts-ignore
                .manufacturerData[2];
            if (newSerial != lastSerial) {
                lastActionSerials[
                    // @ts-ignore
                    bleDevice.id] =
                    newSerial;
                // @ts-ignore
                if (bleDevice.manufacturerData && bleDevice.manufacturerData.length > 0) {
                    action = convertAdvToAction(
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
}
