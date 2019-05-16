import { layoutId } from '@layout/layout-id';
import { Id } from '@logic/models/base';
import { BroadcastAction } from '@logic/state/action';
import { createActionTrainChange } from '@logic/state/actions/train-change';
import { Dispatcher } from '@logic/state/store';
import { bleGlobals, characteristicUUIDBroadcast, serviceUUID } from '@utils/ble-globals';
import { convertActionToAdv } from '@utils/convert-action-to-adv';
import { convertAdvToAction } from '@utils/convert-adv-to-action';
import { DeviceState } from '../device-state';
import { StoreInterface } from '../store-interface';

export interface ConnectedTrain {
    id: Id;
    sendAction: (action: BroadcastAction<any>) => void;
    disconnect: (() => void) | null;
}

export function bleConnectionClient(
    state: DeviceState,
    dispatcher: Dispatcher<BroadcastAction<any>>,
    storeInterface: StoreInterface,
): StoreInterface {
    storeInterface.connectTrainDriver = (
        trainId: Id,
    ): void => {
        navigator.bluetooth
            .requestDevice({
                filters: [
                    {
                        namePrefix: bleGlobals + layoutId + '+',
                    },
                ],
            })
            .then((device: BluetoothDevice) => {
                if (device.gatt) {
                    device.addEventListener('gattserverdisconnected', () => {
                        const connectedTrain = storeInterface.connectedTrains[trainId];
                        if (connectedTrain) {
                            connectedTrain.disconnect = null;
                            storeInterface.disconnectTrainDriver(trainId);
                        }
                    });
                    return device.gatt.connect();
                }
                throw new Error('No GATT server for device id: ' + device.id);
            })
            .then((server) => server.getPrimaryService(serviceUUID))
            .then((service) => service.getCharacteristic(characteristicUUIDBroadcast))
            .then((characteristic) => {

                // TODO: should disconnect if already has any connectedTrains[trainId]
                storeInterface.connectedTrains[trainId] = {
                    id: trainId,
                    sendAction: (action: BroadcastAction<any>) => {
                        characteristic.writeValue(convertActionToAdv(action)!)
                            .catch(console.error);
                    },
                    disconnect: characteristic.service!.device.gatt!.disconnect,
                };

                dispatcher(createActionTrainChange({
                    trainId,
                    driverDevice: characteristic.service!.device.id,
                }));
                characteristic.addEventListener(
                    'characteristicvaluechanged',
                    (event) => {
                        // @ts-ignore
                        const action = convertAdvToAction(event.target.value);
                        if (action) {
                            action.isBroadcasted = true;
                            dispatcher(action);
                        }
                    },
                );
                return characteristic.startNotifications();
            })
            .catch(console.error);
    };

    storeInterface.disconnectTrainDriver = (
        trainId: Id,
    ): void => {
        const connectedTrain = storeInterface.connectedTrains[trainId];
        if (connectedTrain) {
            if (connectedTrain.disconnect) {
                connectedTrain.disconnect();
            }
            delete storeInterface.connectedTrains[trainId];
            dispatcher(createActionTrainChange({
                trainId,
                driverDevice: null,
            }));
        }

    };

    return storeInterface;
}
