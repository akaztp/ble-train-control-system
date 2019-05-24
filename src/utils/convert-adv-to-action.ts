import { ActionType, BroadcastAction } from '@logic/state/action';
import { createActionSignalLight } from '@logic/state/actions/signal-light';
import { createActionSwitch } from '@logic/state/actions/switch';
import { createActionTrainAdd } from '@logic/state/actions/train-add';
import { createActionTrainDriverId } from '@logic/state/actions/train-driver-id';
import { createActionTrainInvertDir } from '@logic/state/actions/train-invert-dir';
import { createActionTrainName } from '@logic/state/actions/train-name';
import { createActionTrainPosition } from '@logic/state/actions/train-position';
import { createActionTrainSensor } from '@logic/state/actions/train-sensor';
import { createActionTrainSpeed } from '@logic/state/actions/train-speed';
import { StoreAction } from '@logic/state/store';

export function convertAdvToAction(data: Uint8ClampedArray): BroadcastAction<any> | null {
    const storeAction = convertPayloadToAction(data);
    if (storeAction) {
        const action: BroadcastAction<any> = {
            ...storeAction,
            layoutId: String.fromCharCode(data[0]) + String.fromCharCode(data[1]),
            isBroadcasted: true,
        };
        return action;
    }
    return null;
}

function convertPayloadToAction(data: Uint8ClampedArray): StoreAction<any> | null {
    const actionType: ActionType = data[3];

    if (actionType === ActionType.TrainSensor) {
        return createActionTrainSensor({
            signalId: data[4],
            segId: data[5],
            state: numberToBoolean(data[6]),
        });
    }

    if (actionType === ActionType.TrainPosition) {
        return createActionTrainPosition({
            trainId: data[4],
            segId: data[5],
            enterSegId: numberToNull(data[6]),
            stopAtSignal: numberToNull(data[7]),
        });
    }

    if (actionType === ActionType.TrainSpeed) {
        return createActionTrainSpeed({
            trainId: data[4],
            speed: byteToRatio(data[5]),
            temp: numberToBoolean(data[6]),
        });
    }

    if (actionType === ActionType.Switch) {
        return createActionSwitch({
            switchId: data[4],
            pos: data[5],
            enabled: numberToBoolean(data[6]),
        });
    }

    if (actionType === ActionType.SignalLight) {
        return createActionSignalLight({
            signalId: data[4],
            segId: data[5],
            state: data[6],
        });
    }

    if (actionType === ActionType.TrainAdd) {
        return createActionTrainAdd({
            trainId: data[4],
            segId: data[5],
            // @ts-ignore
            driverDeviceId: deviceIdToString(data.slice(6)),
        });
    }

    if (actionType === ActionType.TrainName) {
        return createActionTrainName({
            trainId: data[4],
            // @ts-ignore
            name: stringFromArray(data.slice(5)),
        });
    }

    if (actionType === ActionType.TrainDriverId) {
        return createActionTrainDriverId({
            trainId: data[4],
            // @ts-ignore
            driverDeviceId: deviceIdToString(data.slice(5)),
        });
    }

    if (actionType === ActionType.TrainInvertDir) {
        return createActionTrainInvertDir({
            trainId: data[4],
            invDir: numberToBoolean(data[5]),
        });
    }

    return null;
}

function numberToNull(n: number): number | null {
    return n !== 255 ? n : null;
}

function numberToBoolean(n: number): boolean {
    return !!n;
}

function byteToRatio(byte: number): number {
    if (byte < 128) {
        return byte / 127;
    } else {
        return (byte - 128) / -127;
    }
}

function stringFromArray(chars: number[]): string {
    return String.fromCharCode(...chars);
}

export function deviceIdToString(deviceId: number[]): string | null {
    let str: string | null = deviceId
        .map((byte: number) =>
            byte < 16 ?
                '0' + byte.toString(16).toLowerCase() :
                byte.toString(16).toLowerCase())
        .join(':');
    if (str === '') {
        str = null;
    }
    return str;
}
