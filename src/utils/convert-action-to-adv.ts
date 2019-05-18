import { ActionType, BroadcastAction, isActionOfType } from '@logic/state/action';
import { ActionPayloadSignalLight } from '@logic/state/actions/signal-light';
import { ActionPayloadSwitch } from '@logic/state/actions/switch';
import { ActionPayloadTrainAdd } from '@logic/state/actions/train-add';
import { ActionPayloadTrainDriverId } from '@logic/state/actions/train-driver-id';
import { ActionPayloadTrainInvertDir } from '@logic/state/actions/train-invert-dir';
import { ActionPayloadTrainName } from '@logic/state/actions/train-name';
import { ActionPayloadTrainPosition } from '@logic/state/actions/train-position';
import { ActionPayloadTrainSensor } from '@logic/state/actions/train-sensor';
import { ActionPayloadTrainSpeed } from '@logic/state/actions/train-speed';

// max 14 elements in output array
export function convertActionToAdv(action: BroadcastAction<any>): Uint8ClampedArray | null {
    const convertedPayload = convertPayloadToAdv(action);
    if (convertedPayload) {
        return new Uint8ClampedArray([
                action.layoutId.charCodeAt(0),
                action.layoutId.charCodeAt(1),
                getSerialNum(),
                action.type,
                ...convertedPayload,
            ],
        );
    }
    return null;
}


let advSerialNum = 0;

function getSerialNum(): number {
    advSerialNum = (advSerialNum + 1) & 0xff;
    return advSerialNum;
}

// max 10 elements in output array
function convertPayloadToAdv(action: BroadcastAction<any>): number[] | null {

    if (isActionOfType<ActionPayloadTrainSensor>(action, ActionType.TrainSensor)) {
        return [
            action.payload.signalId,
            action.payload.segmentId,
            booleanToNumber(action.payload.state),
        ];
    }

    if (isActionOfType<ActionPayloadTrainPosition>(action, ActionType.TrainPosition)) {
        return [
            action.payload.trainId,
            action.payload.segmentId,
            nullToNumber(action.payload.enteringSegmentId),
            nullToNumber(action.payload.stoppedAtSignalLight),
        ];
    }

    if (isActionOfType<ActionPayloadTrainSpeed>(action, ActionType.TrainSpeed)) {
        return [
            action.payload.trainId,
            ratioToByte(action.payload.speed),
            booleanToNumber(action.payload.temporary),
        ];
    }

    if (isActionOfType<ActionPayloadSwitch>(action, ActionType.Switch)) {
        return [
            action.payload.switchId,
            action.payload.position,
            booleanToNumber(action.payload.enabled),
        ];
    }

    if (isActionOfType<ActionPayloadSignalLight>(action, ActionType.SignalLight)) {
        return [
            action.payload.signalId,
            action.payload.segmentId,
            action.payload.state,
        ];
    }

    if (isActionOfType<ActionPayloadTrainAdd>(action, ActionType.TrainAdd)) {
        return [
            action.payload.trainId,
            action.payload.segmentId,
            ...deviceIdToArray(action.payload.driverDeviceId),
        ];
    }

    if (isActionOfType<ActionPayloadTrainName>(action, ActionType.TrainName)) {
        return [
            action.payload.trainId,
            ...stringToArray(action.payload.name.substr(0, 9)),
        ];
    }

    if (isActionOfType<ActionPayloadTrainDriverId>(action, ActionType.TrainDriverId)) {
        return [
            action.payload.trainId,
            ...deviceIdToArray(action.payload.driverDeviceId),
        ];
    }

    if (isActionOfType<ActionPayloadTrainInvertDir>(action, ActionType.TrainInvertDir)) {
        return [
            action.payload.trainId,
            booleanToNumber(action.payload.invertedDir),
        ];
    }

    return null;
}

function nullToNumber(n: number | null): number {
    return n !== null ? n : 255;
}

function booleanToNumber(b: boolean): number {
    return b ? 1 : 0;
}

function ratioToByte(ratio: number): number {
    if (ratio >= 0) {
        return Math.round(ratio * 127);
    } else {
        return Math.round(-ratio * 127 + 128);
    }
}

function stringToArray(str: string): number[] {
    const nums: number[] = [];
    for (let i = 0; i < str.length; i++) {
        nums.push(str.charCodeAt(i));
    }
    return nums;
}

function deviceIdToArray(a: string | null): number[] {
    if (!a) {
        return [];
    }
    return a.split(':')
        .map(hex => parseInt(hex, 16));
}
