import { BroadcastAction } from '@logic/state/action';
import { bleGlobals, characteristicUUIDBroadcast, serviceUUID } from '@utils/ble-globals';
import { convertActionToAdv } from '@utils/convert-action-to-adv';
import { convertAdvToAction } from '@utils/convert-adv-to-action';

let connected: boolean = false;

// setup BLE connection client and data receive callback
export function setupTunnel(
    layoutId: string,
    trainName: string,
    trainDriverDeviceId: string,
    actionHandler: (action: BroadcastAction<any>) => void,
) {
    const deviceId = trainDriverDeviceId.split(':')
        .map(hex => parseInt(hex, 16));

    NRF.on('connect', () => {
        connected = true;
    });

    NRF.on('disconnect', () => {
        connected = false;
        // @ts-ignore
        NRF.updateServices({
                [serviceUUID]: {
                    [characteristicUUIDBroadcast]: {
                        value: new Uint8Array(deviceId).buffer,
                        notify: true,
                    },
                },
            },
        );
    });

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

// send data to BLE connection
export function actionToTunnel(action: BroadcastAction<any>) {
    if (connected) {
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
}
