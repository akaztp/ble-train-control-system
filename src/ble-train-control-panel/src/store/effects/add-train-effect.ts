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
        const train = findTrainTouchingSegment(state.trains, action.payload.segmentId);
        if (train && train.id === action.payload.trainId) {
            return [
                createActionTrainPosition({
                    trainId: train.id,
                    segmentId: train.segment.id,
                    enteringSegmentId: (train.enteringSegment !== null) ? train.enteringSegment.id : null,
                    stoppedAtSignalLight: null,
                }),
                createActionTrainSpeed({
                    trainId: train.id,
                    speed: 0,
                    temporary: false,
                }),
            ];
        } else {
            // TODO: emit an error notification about the train hasn't been added
            return [];
        }
    };

export const addTrainEffect: Effect<DeviceState, BroadcastAction<any>> =
    triggerEffectForAction<DeviceState, BroadcastAction<any>>(
        ActionType.TrainJoin,
        effect,
    );
