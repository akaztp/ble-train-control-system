import { SignalLightState } from '@logic/models/signal-light';
import { State } from '@logic/models/state';
import {
    ActionPayloadSignalLight,
    ActionType,
    createActionTrainPosition,
    createActionTrainSpeed,
} from '@logic/state/action';
import { Effect, StoreAction, triggerEffectForAction } from '@logic/state/store';
import { findTrainInsideSegment } from '@logic/state/utils/train';
import { findNextSegmentId, segmentDirection } from '@logic/state/utils/segment';

const effect: Effect<State> =
    (
        action: StoreAction<ActionPayloadSignalLight>,
        state: State,
    ): Array<StoreAction<any>> => {
        if (action.payload.state === SignalLightState.Green) {
            let segmentId = action.payload.segmentId;
            const train = findTrainInsideSegment(state.trains, segmentId);
            if (train && train.speed === 0 && train.speedBeforeStop !== 0) {
                const segment = state.segments[segmentId];
                const signalId = action.payload.signalId;
                const directionSignalLight = segmentDirection(segment, train.speedBeforeStop);
                if (directionSignalLight !== null && directionSignalLight.id === signalId) {
                    const nextSegmentId = findNextSegmentId(
                        segment,
                        signalId,
                        state.switches,
                    );
                    if (nextSegmentId !== null) {
                        return [
                            createActionTrainPosition({
                                trainId: train.id,
                                segmentId,
                                enteringSegmentId: nextSegmentId,
                            }),
                            createActionTrainSpeed({
                                trainId: train.id,
                                speed: train.speedBeforeStop,
                                temporary: false,
                            })
                        ];
                    }
                }
            }
        }
        return [];
    };

export const trainGreenGoEffect: Effect<State> = triggerEffectForAction<State>(
    ActionType.SignalLight,
    effect,
);
