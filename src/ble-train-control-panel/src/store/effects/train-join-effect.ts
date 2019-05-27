import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainJoin } from '@logic/state/actions/train-join';
import { createActionTrainPosition } from '@logic/state/actions/train-position';
import { createActionTrainSpeed } from '@logic/state/actions/train-speed';
import { Effect, triggerEffectForAction } from '@logic/state/store';
import { findTrainTouchingSegment } from '@logic/state/utils/train';
import { DeviceState } from '../device-state';

const effect: Effect<DeviceState, BroadcastAction<any>> =
    (
        action: BroadcastAction<ActionPayloadTrainJoin>,
        state: DeviceState,
    ): Array<BroadcastAction<any>> => {
        const train = findTrainTouchingSegment(state.trains, action.payload.segId);
        if (train && train.id === action.payload.trainId) {
            return [
                createActionTrainPosition({
                    trainId: train.id,
                    segId: train.seg.id,
                    enterSegId: (train.enterSeg !== null) ? train.enterSeg.id : null,
                    stopAtSignal: null,
                }),
                createActionTrainSpeed({
                    trainId: train.id,
                    speed: 0,
                    temp: false,
                }),
            ];
        } else {
            // TODO: emit an error notification about the train hasn't been added
            return [];
        }
    };

export const trainJoinEffect: Effect<DeviceState, BroadcastAction<any>> =
    triggerEffectForAction<DeviceState, BroadcastAction<any>>(
        ActionType.TrainJoin,
        effect,
    );
