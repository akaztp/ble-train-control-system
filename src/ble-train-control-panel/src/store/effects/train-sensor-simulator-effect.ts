import { positionChanged, speedChanged } from '../action-sources/train-sensor-simulator';
import { State } from '@logic/models/state';
import { ActionPayloadTrainPosition, ActionPayloadTrainSpeed, ActionType } from '@logic/state/action';
import { Effect, StoreAction, triggerEffectForAction } from '@logic/state/store';

const effect: Effect<State> =
    (
        action: StoreAction<ActionPayloadTrainPosition | ActionPayloadTrainSpeed>,
        state: State,
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
