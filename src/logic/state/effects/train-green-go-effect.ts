import { SignalLightState } from '@logic/models/signal-light';
import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadSignalLight } from '@logic/state/actions/signal-light';
import { createActionTrainPosition } from '@logic/state/actions/train-position';
import { createActionTrainSpeed } from '@logic/state/actions/train-speed';
import { State } from '@logic/state/state';
import { Effect, triggerEffectForAction } from '@logic/state/store';
import { findNextSegmentId, segmentDirection } from '@logic/state/utils/segment';
import { findTrainInsideSegment } from '@logic/state/utils/train';

const effect: Effect<State<unknown>, BroadcastAction<any>> =
    (
        action: BroadcastAction<ActionPayloadSignalLight>,
        state: State<unknown>,
    ): Array<BroadcastAction<any>> => {
        if (action.payload.state === SignalLightState.Green) {
            const segmentId = action.payload.segId;
            const train = findTrainInsideSegment(state.trains, segmentId);
            if (train && train.speed === 0 && train.speedBefStop !== 0) {
                const segment = state.segments[segmentId];
                const signalId = action.payload.signalId;
                const directionSignalLight = segmentDirection(
                    segment,
                    train.speedBefStop,
                    train.invDir,
                );
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
                                segId: segmentId,
                                enterSegId: nextSegmentId,
                                stopAtSignal: null,
                            }),
                            createActionTrainSpeed({
                                trainId: train.id,
                                speed: train.speedBefStop,
                                temp: false,
                            }),
                        ];
                    }
                }
            }
        }
        return [];
    };

export const trainGreenGoEffect: Effect<State<unknown>, BroadcastAction<any>> =
    triggerEffectForAction<State<unknown>, BroadcastAction<any>>(
        ActionType.SignalLight,
        effect,
    );
