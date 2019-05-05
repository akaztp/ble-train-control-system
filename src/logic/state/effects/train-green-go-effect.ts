import { SignalLightState } from '@logic/models/signal-light';
import { State } from '@logic/models/state';
import { ActionType } from '@logic/state/action';
import { ActionPayloadSignalLight } from '@logic/state/actions/signal-light';
import { createActionTrainPosition } from '@logic/state/actions/train-position';
import { createActionTrainSpeed } from '@logic/state/actions/train-speed';
import { Effect, StoreAction, triggerEffectForAction } from '@logic/state/store';
import { findNextSegmentId, segmentDirection } from '@logic/state/utils/segment';
import { findTrainInsideSegment } from '@logic/state/utils/train';

const effect: Effect<State> =
    (
        action: StoreAction<ActionPayloadSignalLight>,
        state: State,
    ): Array<StoreAction<any>> => {
        if (action.payload.state === SignalLightState.Green) {
            const segmentId = action.payload.segmentId;
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
                                stoppedAtSignalLight: null,
                            }),
                            createActionTrainSpeed({
                                trainId: train.id,
                                speed: train.speedBeforeStop,
                                temporary: false,
                            }),
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
