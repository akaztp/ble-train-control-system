import { ActionType, BroadcastAction, isActionOfType } from '@logic/state/action';
import { ActionPayloadSignalLight } from '@logic/state/actions/signal-light';
import { ActionPayloadSwitch } from '@logic/state/actions/switch';
import { ActionPayloadTrainAdd } from '@logic/state/actions/train-add';
import { ActionPayloadTrainPosition } from '@logic/state/actions/train-position';
import { ActionPayloadTrainSensor } from '@logic/state/actions/train-sensor';
import { ActionPayloadTrainSpeed } from '@logic/state/actions/train-speed';

export function convertActionToAdv(action: BroadcastAction<any>): Uint8ClampedArray | null {
    const convertedPayload = convertPayloadToAdv(action);
    if (convertedPayload) {
        return Uint8ClampedArray.of(
            action.layoutId.charCodeAt(0),
            action.layoutId.charCodeAt(1),
            getSerialNum(),
            action.type,
            ...convertedPayload,
        );
    }
    return null;
}


let advSerialNum = 0;

function getSerialNum(): number {
    advSerialNum = (advSerialNum + 1) & 0xff;
    return advSerialNum;
}

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
            action.payload.speed,
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
        return [action.payload.trainId, action.payload.segmentId];
    }

    return null;
}

function nullToNumber(n: number | null): number {
    return n !== null ? n : 255;
}

function booleanToNumber(b: boolean): number {
    return b ? 1 : 0;
}
