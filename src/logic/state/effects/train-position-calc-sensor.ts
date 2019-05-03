import { SignalLightState } from '@logic/models/signal-light';
import { State } from '@logic/models/state';
import {
    ActionPayloadTrainSensor,
    ActionType,
    createActionTrainPosition,
    createActionTrainSpeed,
} from '@logic/state/action';
import { Effect, StoreAction, triggerEffectForAction } from '@logic/state/store';
import { findNextSegmentId } from '@logic/state/utils/find-next-segment-id';
import { findTrainEnteringSegment, findTrainInsideSegment } from '@logic/state/utils/find-train';
import { segmentSignalLight } from '@logic/state/utils/segment-signal-light';

const effect: Effect<State> =
    (
        action: StoreAction<ActionPayloadTrainSensor>,
        state: State,
    ): Array<StoreAction<any>> => {
        if (action.payload.state) {
            const {segmentId, signalId} = action.payload;
            let train = findTrainInsideSegment(state.trains, segmentId);
            // TODO: check if train is controlled by current device
            if (train) {
                const segment = state.segments[segmentId];
                const signalLight = segmentSignalLight(segment, signalId);
                if (signalLight && signalLight.state === SignalLightState.Green) {
                    const nextSegmentId = findNextSegmentId(segment, signalId, state.switches);
                    if (nextSegmentId !== null) {
                        return [
                            createActionTrainPosition({
                                trainId: train.id,
                                segmentId,
                                enteringSegmentId: nextSegmentId,
                            }),
                        ];
                    }
                }
                return [
                    createActionTrainSpeed({
                        trainId: train.id,
                        speed: 0,
                    }),
                ];
            } else {
                train = findTrainEnteringSegment(state.trains, segmentId);
                if (train) {
                    // TODO: check if train is controlled by current device
                    return [
                        createActionTrainPosition({
                            trainId: train.id,
                            segmentId,
                            enteringSegmentId: null,
                        }),
                    ];
                }
            }
        }
        return [];
    };

export const trainPositionCalcSensorEffect: Effect<State> = triggerEffectForAction<State>(
    ActionType.TrainSensor,
    effect,
);
