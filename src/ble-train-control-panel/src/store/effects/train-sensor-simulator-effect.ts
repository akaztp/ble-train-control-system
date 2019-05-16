import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainPosition } from '@logic/state/actions/train-position';
import { ActionPayloadTrainSpeed } from '@logic/state/actions/train-speed';
import { Effect, triggerEffectForAction } from '@logic/state/store';
import { positionChanged, speedChanged } from '../action-sources/train-sensor-simulator';
import { DeviceState } from '../device-state';

const effect: Effect<DeviceState, BroadcastAction<any>> = (
    action: BroadcastAction<ActionPayloadTrainPosition | ActionPayloadTrainSpeed>,
): Array<BroadcastAction<any>> => {
    switch (action.type) {
        case ActionType.TrainPosition:
            positionChanged(action.payload as ActionPayloadTrainPosition);
            break;
        case ActionType.TrainSpeed:
            speedChanged(action.payload as ActionPayloadTrainSpeed);
            break;
    }
    return [];
};

export const trainSensorSimulatorEffect: Effect<DeviceState, BroadcastAction<any>> =
    triggerEffectForAction<DeviceState, BroadcastAction<any>>(
        [ActionType.TrainSpeed, ActionType.TrainPosition],
        effect,
    );
