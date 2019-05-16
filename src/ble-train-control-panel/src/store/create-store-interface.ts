import { segments } from '@layout/segments';
import { Segment } from '@logic/models/segment';
import { BroadcastAction } from '@logic/state/action';
import { createInitialState } from '@logic/state/create-initial-state';
import { signalLightsCalcEffect } from '@logic/state/effects/signal-lights-calc-effect';
import { trainGreenGoEffect } from '@logic/state/effects/train-green-go-effect';
import { trainPositionCalcSensorEffect } from '@logic/state/effects/train-position-calc-sensor-effect';
import { signalLightReducer } from '@logic/state/reducers/signal-light-reducer';
import { switchReducer } from '@logic/state/reducers/switch-reducer';
import { trainPositionReducer } from '@logic/state/reducers/train-position-reducer';
import { trainSpeedReducer } from '@logic/state/reducers/train-speed-reducer';
import { ActionSource, createStore as baseCreateStore, Effect, Reducer } from '@logic/state/store';
import { noop } from 'vue-class-component/lib/util';
import { addTrain } from './action-sources/add-train';
import { bleConnectionClient } from './action-sources/ble-connection-client';
import { changeTrainDir } from './action-sources/change-train-dir';
import { changeTrainSpeed } from './action-sources/change-train-speed';
import { switchChanger } from './action-sources/switch-changer';
import { trainSensorSimulator } from './action-sources/train-sensor-simulator';
import { DeviceState } from './device-state';
import { addTrainEffect } from './effects/add-train-effect';
import { broadcasterEffectFactory } from './effects/ble-connection-effect';
import { trainSensorSimulatorEffect } from './effects/train-sensor-simulator-effect';
import { Observer } from './observer';
import { switchAvailabilityReducer } from './reducers/switch-availability-reducer';
import { trainAddReducer } from './reducers/train-add-reducer';
import { trainChangeReducer } from './reducers/train-change-reducer';
import { findTrainTouchingSegmentSelector$ } from './selectors/find-train-touching-segment-selector';
import { trainsListSelector$ } from './selectors/trains-list-selector';
import { StoreInterface } from './store-interface';

const deviceId: string | null = null;

const stateObserver$ = new Observer<DeviceState>();

const reducers: Array<Reducer<DeviceState, BroadcastAction<any>>> = [
    trainAddReducer,
    trainChangeReducer,
    trainPositionReducer,
    switchReducer,
    signalLightReducer,
    trainSpeedReducer,
    switchAvailabilityReducer,
    (state) => stateObserver$.notify(state),
];

const actionSources: Array<ActionSource<DeviceState, StoreInterface, BroadcastAction<any>>> = [
    addTrain,
    changeTrainDir,
    changeTrainSpeed,
    switchChanger,
    trainSensorSimulator,
    bleConnectionClient,
];

export function createStoreInterface(): StoreInterface {

    const initialStoreInterface: StoreInterface = {
        addTrain: noop,
        changeTrainDir: noop,
        changeTrainSpeed: noop,
        findTrainTouchingSegment$: () => () => undefined,
        switchChanger: noop,
        trainsList$: () => () => undefined,
        connectTrainDriver: noop,
        connectedTrains: {},
        disconnectTrainDriver: noop,
    };

    const effects: Array<Effect<DeviceState, BroadcastAction<any>>> = [
        addTrainEffect,
        signalLightsCalcEffect,
        trainSensorSimulatorEffect,
        trainPositionCalcSensorEffect,
        trainGreenGoEffect,
        broadcasterEffectFactory(initialStoreInterface.connectedTrains),
    ];

    // TODO: signalLights should only be filled in, if lights are to be simulated
    const signalLights = (Object.values(segments()) as Segment[]).reduce<{ [key: number]: null }>(
        (acc, segment) => {
            if (segment.fromSignalLight) {
                acc[segment.fromSignalLight.id] = null;
            }
            if (segment.toSignalLight) {
                acc[segment.toSignalLight.id] = null;
            }
            return acc;
        },
        {},
    );

    const {context} = baseCreateStore<DeviceState, StoreInterface, BroadcastAction<any>>(
        createInitialState(
            deviceId,
            {
                signalLights,
            },
        ),
        reducers,
        effects,
        actionSources,
        initialStoreInterface,
    );

    context.findTrainTouchingSegment$ = findTrainTouchingSegmentSelector$(stateObserver$);
    context.trainsList$ = trainsListSelector$(stateObserver$);
    return context;
}
