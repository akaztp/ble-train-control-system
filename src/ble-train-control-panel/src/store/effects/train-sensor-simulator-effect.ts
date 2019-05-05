import { State } from '@logic/models/state';
import { ActionType } from '@logic/state/action';
import { ActionPayloadTrainPosition } from '@logic/state/actions/train-position';
import { ActionPayloadTrainSpeed } from '@logic/state/actions/train-speed';
import { Effect, StoreAction, triggerEffectForAction } from '@logic/state/store';
import { positionChanged, speedChanged } from '../action-sources/train-sensor-simulator';

const effect: Effect<State> = (
    action: StoreAction<ActionPayloadTrainPosition | ActionPayloadTrainSpeed>,
): Array<StoreAction<any>> => {
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

export const trainSensorSimulatorEffect: Effect<State> = triggerEffectForAction<State>(
    [ActionType.TrainSpeed, ActionType.TrainPosition],
    effect,
);
