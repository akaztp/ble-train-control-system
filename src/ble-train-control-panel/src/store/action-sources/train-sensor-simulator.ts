import { StoreInterface } from '@/store/store-interface';
import { Id, SimpleMap } from '@logic/models/base';
import { SignalLight } from '@logic/models/signal-light';
import { State } from '@logic/models/state';
import {
    ActionPayloadTrainPosition,
    ActionPayloadTrainSpeed,
    createActionTrainSensor,
    createActionTrainSpeed,
} from '@logic/state/action';
import { Dispatcher } from '@logic/state/store';
import { findNextSegmentId, segmentDirection } from '@logic/state/utils/segment';

interface SimulatedTrainState {
    id: Id;
    timerId: number | null;
    segmentId: Id | null;
    speed: number;
}

const trainsState: SimpleMap<SimulatedTrainState> = {};
let state: State;
let dispatcher: Dispatcher;

export function trainSensorSimulator(
    extState: State,
    extDispatcher: Dispatcher,
    storeInterface: StoreInterface,
): StoreInterface {
    state = extState;
    dispatcher = extDispatcher;
    return storeInterface;
}


export function speedChanged(speedInfo: ActionPayloadTrainSpeed): void {
    const {trainId, speed} = speedInfo;
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

export function positionChanged(positionInfo: ActionPayloadTrainPosition): void {
    const segmentId = positionInfo.segmentId;
    const trainId = positionInfo.trainId;
    const trainState = trainsState[trainId];
    if (positionInfo.enteringSegmentId === null) {
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
        triggerEnteringSensor(segmentId, positionInfo.enteringSegmentId);
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

function moveTrain(id: Id, speed: number): void {
    const trainState = trainsState[id];
    trainState.speed = speed;
    trainState.timerId = setTimeout(
        () => triggerExitSensor(id),
        2000 + Math.random() * 1000,
    );
}

function stopTrain(id: Id): void {
    const trainState = trainsState[id];
    if (trainState) {
        if (trainState.timerId !== null) {
            clearTimeout(trainState.timerId);
        }
        trainState.timerId = null;
        trainState.speed = 0;
    }
}

function triggerExitSensor(trainId: Id): void {
    const trainState = trainsState[trainId];
    if (trainState) {
        const segmentId = trainState.segmentId;
        if (segmentId !== null) {
            const signalLight = segmentDirection(state.segments[segmentId], trainState.speed);
            if (signalLight !== null) {
                dispatcher(
                    createActionTrainSensor({
                        segmentId,
                        signalId: signalLight.id,
                        state: true,
                    }));
            } else {
                dispatcher(
                    createActionTrainSpeed({
                        trainId,
                        speed: 0,
                        temporary: false,
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
        setTimeout(
            () =>
                dispatcher(
                    createActionTrainSensor({
                        segmentId: enteringSegmentId,
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

    if (state.segments[enteringSegmentId].fromSignalLight !== null) {
        const segmentAId = findNextSegmentId(
            state.segments[enteringSegmentId],
            state.segments[enteringSegmentId].fromSignalLight!.id,
            state.switches,
        );
        if (segmentAId === leavingSegmentId) {
            signalLightId = state.segments[enteringSegmentId].fromSignalLight!.id;
        }
    }

    if (signalLightId === null && state.segments[enteringSegmentId].toSignalLight !== null) {
        const segmentBId = findNextSegmentId(
            state.segments[enteringSegmentId],
            state.segments[enteringSegmentId].toSignalLight!.id,
            state.switches,
        );
        if (segmentBId === leavingSegmentId) {
            signalLightId = state.segments[enteringSegmentId].toSignalLight!.id;
        }
    }
    return signalLightId;
}