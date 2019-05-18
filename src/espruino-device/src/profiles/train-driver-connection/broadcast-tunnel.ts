import { BroadcastAction } from '@logic/state/action';
import { bleGlobals, characteristicUUIDBroadcast, serviceUUID } from '@utils/ble-globals';
import { convertActionToAdv } from '@utils/convert-action-to-adv';
import { convertAdvToAction } from '@utils/convert-adv-to-action';

export function setupTunnel(
    layoutId: string,
    trainName: string,
    trainDriverDeviceId: string,
    actionHandler: (action: BroadcastAction<any>) => void,
) {
    const deviceId = trainDriverDeviceId.split(':')
        .map(hex => parseInt(hex, 16));

    // @ts-ignore
    NRF.setServices(
        {
            [serviceUUID]: {
                [characteristicUUIDBroadcast]: {
                    value: new Uint8Array(deviceId).buffer,
                    readable: true,
                    writable: true,
                    notify: true,
                    maxLen: 12,
                    onWrite: tunnelRxHandler,
                },
            },
        },
        {
            uart: true,
        },
    );

    // @ts-ignore
    NRF.setAdvertising(
        {},
        {name: bleGlobals + layoutId + '+' + trainName},
    );

    function tunnelRxHandler(event: any): void {
        // Serial1.println(JSON.stringify(event));
        if (event && event.data && event.data.length > 0) {
            let action = convertAdvToAction(
                new Uint8ClampedArray(
                    (event.data as ArrayBuffer),
                ));
            if (action) {
                action.isBroadcasted = false;
                actionHandler(action);
            }
        }
    }
}

export function actionToTunnel(action: BroadcastAction<any>) {
    // @ts-ignore
    NRF.updateServices({
            [serviceUUID]: {
                [characteristicUUIDBroadcast]: {
                    value: convertActionToAdv(action)!.buffer,
                    notify: true,
                },
            },
        },
    );
}
