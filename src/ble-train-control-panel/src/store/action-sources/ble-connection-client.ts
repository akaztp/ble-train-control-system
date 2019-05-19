import { layoutId } from '@layout/layout-id';
import { Id, SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { Train } from '@logic/models/train';
import { BroadcastAction } from '@logic/state/action';
import { createActionSignalLight } from '@logic/state/actions/signal-light';
import { createActionTrainAdd } from '@logic/state/actions/train-add';
import { createActionTrainDriverId } from '@logic/state/actions/train-driver-id';
import { createActionTrainName } from '@logic/state/actions/train-name';
import { createActionTrainPosition } from '@logic/state/actions/train-position';
import { Dispatcher } from '@logic/state/store';
import { bleGlobals, characteristicUUIDBroadcast, serviceUUID } from '@utils/ble-globals';
import { convertActionToAdv } from '@utils/convert-action-to-adv';
import { convertAdvToAction, deviceIdToString } from '@utils/convert-adv-to-action';
import { DeviceState } from '../device-state';
import { StoreInterface } from '../store-interface';

export interface ConnectedTrain {
    id: Id;
    sendAction: (action: BroadcastAction<any>) => void;
    disconnect: (() => void) | null;
}

let writeValueQueue = Promise.resolve();

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
                        // services: [serviceUUID],
                    },
                ],
                optionalServices: [serviceUUID, '6e400001-b5a3-f393-e0a9-e50e24dcca9e'],
            })
            .then((device: BluetoothDevice) => {
                console.log('Here1. Device:', device);
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
            .then((server) => {
                console.log('Here2');
                return server.getPrimaryService(serviceUUID);
            })
            .then((service) => {
                console.log('Here3');
                return service.getCharacteristic(characteristicUUIDBroadcast);
            })
            .then((characteristic) => {
                console.log('Here4');
                // TODO: should disconnect if already has any connectedTrains[trainId]
                storeInterface.connectedTrains[trainId] = {
                    id: trainId,
                    sendAction: (action: BroadcastAction<any>) => {
                        let adv = convertActionToAdv(action);
                        if (!!adv) {
                            // console.log('convertActionToAdv(): ', adv.buffer);
                            writeValueQueue = writeValueQueue.then(() =>
                                characteristic.writeValue(adv!)
                                    .catch((e) => console.error(e.message)),
                            );
                        }
                    },
                    disconnect: characteristic.service!.device.gatt!.disconnect,
                };
                return characteristic.readValue()
                    .then(
                        (value) => {
                            if (value) {
                                const deviceId = deviceIdToString(
                                    Array.from(new Uint8Array((value as DataView).buffer)),
                                );
                                console.log('characteristic.value:', deviceId);
                                advertiseTrain(dispatcher, state.trains[trainId], deviceId);
                                advertiseSignalLights(dispatcher, state.segments);
                                characteristic.addEventListener(
                                    'characteristicvaluechanged',
                                    (event) => {
                                        console.log(
                                            'characteristicvaluechanged:',
                                            // @ts-ignore
                                            (event.target!.value as DataView).buffer,
                                        );
                                        const action = convertAdvToAction(
                                            new Uint8ClampedArray(
                                                // @ts-ignore
                                                (event.target!.value as DataView)
                                                    .buffer,
                                            ),
                                        );
                                        if (action) {
                                            action.isBroadcasted = true;
                                            dispatcher(action);
                                        }
                                    },
                                );
                                return characteristic.startNotifications();
                            }
                            return characteristic;
                        },
                    );
            })
            .then((characteristic) => characteristic.service!.device.gatt!.getPrimaryService(
                '6e400001-b5a3-f393-e0a9-e50e24dcca9e'))
            .then((service) => service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e'))
            .then((characteristic) => {
                console.log('Here7');
                characteristic.addEventListener(
                    'characteristicvaluechanged',
                    (event) => {
                        const td = new TextDecoder('utf-8');
                        console.debug(td.decode(
                            // @ts-ignore
                            (event.target!.value as DataView)
                                .buffer));
                    },
                );
                return characteristic.startNotifications();
            })
            .catch((e) => console.error(e.message));
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
            dispatcher(createActionTrainDriverId({
                trainId,
                driverDeviceId: null,
            }));
        }

    };

    return storeInterface;
}

function advertiseTrain(
    dispatcher: Dispatcher<BroadcastAction<any>>,
    train: Train,
    deviceId: string | null,
): void {
    const trainId = train.id;
    dispatcher(createActionTrainAdd({
        trainId,
        segmentId: train.segment.id,
        driverDeviceId: deviceId,
    }));

    dispatcher(createActionTrainName({
        trainId,
        name: train.name,
    }));

    dispatcher(createActionTrainPosition({
        trainId,
        segmentId: train.segment.id,
        enteringSegmentId: train.enteringSegment ? train.enteringSegment.id : null,
        stoppedAtSignalLight: train.stoppedAtSignalLight,
    }));
}

function advertiseSignalLights(
    dispatcher: Dispatcher<BroadcastAction<any>>,
    segments: SimpleMap<Segment>,
): void {
    Object.keys(segments).forEach(
        (k) => {
            const segmentId = parseInt(k, 10);
            let sl = segments[segmentId].fromSignalLight;
            if (sl) {
                dispatcher(createActionSignalLight({
                    signalId: sl.id,
                    segmentId,
                    state: sl.state,
                }));
            }
            sl = segments[segmentId].toSignalLight;
            if (sl) {
                dispatcher(createActionSignalLight({
                    signalId: sl.id,
                    segmentId,
                    state: sl.state,
                }));
            }
        },
    );
}
