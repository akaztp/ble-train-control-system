import { Id, SimpleMap } from '@logic/models/base';
import { BroadcastAction } from '@logic/state/action';
import { createActionTrainSensor } from '@logic/state/actions/train-sensor';
import { ActionPayloadTrainSpeed, createActionTrainSpeed } from '@logic/state/actions/train-speed';
import { Dispatcher } from '@logic/state/store';
import { findNextSegmentId, segmentDirection } from '@logic/state/utils/segment';
import { isSimulated } from '@logic/state/utils/train';
import { DeviceState } from '../device-state';
import { StoreInterface } from '../store-interface';

let state: DeviceState;
let dispatcher: Dispatcher<BroadcastAction<any>>;

export function trainSensorSimulator(
    extState: DeviceState,
    extDispatcher: Dispatcher<BroadcastAction<any>>,
    storeInterface: StoreInterface,
): StoreInterface {
    state = extState;
    dispatcher = extDispatcher;
    return storeInterface;
}

interface SimulatedTrainState {
    id: Id;
    timerId: number | null;
    segmentId: Id | null;
    speed: number;
}

const trainsState: SimpleMap<SimulatedTrainState> = {};


export function speedChanged(speedInfo: ActionPayloadTrainSpeed): void {
    const {trainId, speed} = speedInfo;
    const train = state.trains[trainId];
    if (train && isSimulated(train)) {
        if (speed === 0) {
            stopTrain(trainId);
        } else {
            const trainState = trainsState[trainId];
            if (trainState) {
                if (trainState.segmentId !== null) {
                    const oldSpeed = trainState.speed;
                    if (oldSpeed === 0) {
                        moveTrain(trainId, speed);
                    } else if (oldSpeed * speed < 0) {
                        moveTrain(trainId, speed);
                    }
                }
            } else {
                addTrain(trainId, null);
            }
        }
    }
}

export function driverIdChanged(trainId: Id): void {
    const train = state.trains[trainId];
    const trainState = trainsState[trainId];
    if (train) {
        if (isSimulated(train)) {
            if (!trainState) {
                positionChanged(trainId);
            }
        } else if (trainState) {
            removeTrain(trainId);
        }
    } else if (trainState) {
        removeTrain(trainId);
    }
}

export function positionChanged(trainId: Id): void {
    const train = state.trains[trainId];
    const trainState = trainsState[trainId];
    if (train && isSimulated(train)) {
        const segmentId = train.seg.id;
        const enteringSegmentId = train.enterSeg ? train.enterSeg.id : null;
        if (enteringSegmentId === null) {
            if (trainState) {
                const oldSegmentId = trainState.segmentId;
                trainState.segmentId = segmentId;
                const oldSpeed = trainState.speed;
                if (oldSegmentId !== segmentId && oldSpeed !== null && oldSpeed !== 0) {
                    moveTrain(trainId, oldSpeed);
                }
            } else {
                addTrain(trainId, segmentId);
            }
        } else {
            trainState.segmentId = segmentId;
            triggerEnteringSensor(segmentId, enteringSegmentId);
        }
    } else if (trainState) {
        removeTrain(trainId);
    }
}

function addTrain(id: Id, segmentId: Id | null): void {
    trainsState[id] = {
        id,
        segmentId,
        timerId: null,
        speed: 0,
    };
}

function removeTrain(id: Id): void {
    stopTrain(id);
    delete trainsState[id];
}

function moveTrain(id: Id, speed: number): void {
    const trainState = trainsState[id];
    trainState.speed = speed;
    trainState.timerId = window.setTimeout(
        () => triggerExitSensor(id),
        2000 + Math.random() * 1000,
    );
}

function stopTrain(id: Id): void {
    const trainState = trainsState[id];
    if (trainState) {
        if (trainState.timerId !== null) {
            window.clearTimeout(trainState.timerId);
        }
        trainState.timerId = null;
        trainState.speed = 0;
    }
}

function triggerExitSensor(trainId: Id): void {
    const trainState = trainsState[trainId];
    const train = state.trains[trainId];
    if (trainState && train) {
        const segmentId = trainState.segmentId;
        if (segmentId !== null) {
            const signalLight = segmentDirection(
                state.segments[segmentId],
                trainState.speed,
                train.invDir,
            );
            if (signalLight !== null) {
                dispatcher(
                    createActionTrainSensor({
                        segId: segmentId,
                        signalId: signalLight.id,
                        state: true,
                    }));
            } else {
                dispatcher(
                    createActionTrainSpeed({
                        trainId,
                        speed: 0,
                        temp: false,
                    }));
            }
        }
    }
}

function triggerEnteringSensor(
    segmentId: Id,
    enteringSegmentId: Id,
) {
    const signalLightId = findEnteringSignalLightId(enteringSegmentId, segmentId);
    if (signalLightId !== null) {
        window.setTimeout(
            () =>
                dispatcher(
                    createActionTrainSensor({
                        segId: enteringSegmentId,
                        signalId: signalLightId,
                        state: true,
                    })),
            2000,
        );
    }
}

function findEnteringSignalLightId(
    enteringSegmentId: Id,
    leavingSegmentId: Id,
): Id | null {
    let signalLightId: Id | null = null;

    if (state.segments[enteringSegmentId].frSignal !== null) {
        const segmentAId = findNextSegmentId(
            state.segments[enteringSegmentId],
            state.segments[enteringSegmentId].frSignal!.id,
            state.switches,
        );
        if (segmentAId === leavingSegmentId) {
            signalLightId = state.segments[enteringSegmentId].frSignal!.id;
        }
    }

    if (signalLightId === null && state.segments[enteringSegmentId].toSignal !== null) {
        const segmentBId = findNextSegmentId(
            state.segments[enteringSegmentId],
            state.segments[enteringSegmentId].toSignal!.id,
            state.switches,
        );
        if (segmentBId === leavingSegmentId) {
            signalLightId = state.segments[enteringSegmentId].toSignal!.id;
        }
    }
    return signalLightId;
}
