import { ActionType, BroadcastAction } from '@logic/state/action';
import { createActionSignalLight } from '@logic/state/actions/signal-light';
import { createActionSwitch } from '@logic/state/actions/switch';
import { createActionTrainAdd } from '@logic/state/actions/train-add';
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
            segmentId: data[5],
            state: numberToBoolean(data[6]),
        });
    }

    if (actionType === ActionType.TrainPosition) {
        return createActionTrainPosition({
            trainId: data[4],
            segmentId: data[5],
            enteringSegmentId: numberToNull(data[6]),
            stoppedAtSignalLight: numberToNull(data[7]),
        });
    }

    if (actionType === ActionType.TrainSpeed) {
        return createActionTrainSpeed({
            trainId: data[4],
            speed: data[5],
            temporary: numberToBoolean(data[6]),
        });
    }

    if (actionType === ActionType.Switch) {
        return createActionSwitch({
            switchId: data[4],
            position: data[5],
            enabled: numberToBoolean(data[6]),
        });
    }

    if (actionType === ActionType.SignalLight) {
        return createActionSignalLight({
            signalId: data[4],
            segmentId: data[5],
            state: data[6],
        });
    }

    if (actionType === ActionType.TrainAdd) {
        return createActionTrainAdd({
            trainId: data[4],
            segmentId: data[5],
            name: data[4].toString(),
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
