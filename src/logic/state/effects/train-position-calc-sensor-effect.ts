import { SignalLightState } from '@logic/models/signal-light';
import { ActionType, BroadcastAction } from '@logic/state/action';
import { createActionTrainPosition } from '@logic/state/actions/train-position';
import { ActionPayloadTrainSensor } from '@logic/state/actions/train-sensor';
import { createActionTrainSpeed } from '@logic/state/actions/train-speed';
import { State } from '@logic/state/state';
import { Effect, triggerEffectForAction } from '@logic/state/store';
import { findNextSegmentId, segmentSignalLight } from '@logic/state/utils/segment';
import { findTrainEnteringSegment, findTrainInsideSegment } from '@logic/state/utils/train';

const effect: Effect<State<unknown>, BroadcastAction<any>> =
    (
        action: BroadcastAction<ActionPayloadTrainSensor>,
        state: State<unknown>,
    ): Array<BroadcastAction<any>> => {
        if (action.payload.state) {
            const {segmentId, signalId} = action.payload;
            let train = findTrainInsideSegment(state.trains, segmentId);
            if (train) {
                if (train.driverDeviceId === state.currentDeviceId) {
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
                                    stoppedAtSignalLight: null,
                                }),
                            ];
                        }
                    }
                    return [
                        createActionTrainPosition({
                            trainId: train.id,
                            segmentId,
                            enteringSegmentId: null,
                            stoppedAtSignalLight: signalId,
                        }),
                        createActionTrainSpeed({
                            trainId: train.id,
                            speed: 0,
                            temporary: true,
                        }),
                    ];
                }
            } else {
                train = findTrainEnteringSegment(state.trains, segmentId);
                if (train) {
                    if (train.driverDeviceId === state.currentDeviceId) {
                        return [
                            createActionTrainPosition({
                                trainId: train.id,
                                segmentId,
                                enteringSegmentId: null,
                                stoppedAtSignalLight: null,
                            }),
                        ];
                    }
                }
            }
        }
        return [];
    };

export const trainPositionCalcSensorEffect: Effect<State<unknown>, BroadcastAction<any>> =
    triggerEffectForAction<State<unknown>, BroadcastAction<any>>(
        ActionType.TrainSensor,
        effect,
    );
