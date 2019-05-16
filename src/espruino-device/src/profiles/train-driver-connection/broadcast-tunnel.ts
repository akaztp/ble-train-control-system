import { BroadcastAction } from '@logic/state/action';
import { bleGlobals, characteristicUUIDBroadcast, serviceUUID } from '@utils/ble-globals';
import { convertActionToAdv } from '@utils/convert-action-to-adv';
import { convertAdvToAction } from '@utils/convert-adv-to-action';

export function setupTunnel(
    layoutId: string,
    trainName: string,
    actionHandler: (action: BroadcastAction<any>) => void,
) {
    // @ts-ignore
    NRF.setServices(
        {
            [serviceUUID]: {
                [characteristicUUIDBroadcast]: {
                    description: 'Broadcast Tunnel',
                    readable: true,
                    writable: true,
                    notify: true,
                    maxLength: 8,
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
        if (event && event.data && event.data.length > 0) {
            let action = convertAdvToAction(event.data);
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
                    value: convertActionToAdv(action),
                    notify: true,
                },
            },
        },
    );
}
