import { layoutId } from '@layout/layout-id';
import { State } from '@logic/models/state';
import { LocalAction } from '@logic/state/action';
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
import { changeTrainDir } from './action-sources/change-train-dir';
import { changeTrainSpeed } from './action-sources/change-train-speed';
import { switchChanger } from './action-sources/switch-changer';
import { trainSensorSimulator } from './action-sources/train-sensor-simulator';
import { addTrainEffect } from './effects/add-train-effect';
import { trainSensorSimulatorEffect } from './effects/train-sensor-simulator-effect';
import { Observer } from './observer';
import { switchAvailabilityReducer } from './reducers/switch-availability-reducer';
import { trainAddReducer } from './reducers/train-add-reducer';
import { trainChangeReducer } from './reducers/train-change-reducer';
import { findTrainTouchingSegmentSelector$ } from './selectors/find-train-touching-segment-selector';
import { trainsListSelector$ } from './selectors/trains-list-selector';
import { StoreInterface } from './store-interface';

// TODO: Does this needs to be unique in connected webapps to the same layout ?
export const deviceId = '_local';

const stateObserver$ = new Observer<State>();

const reducers: Array<Reducer<State, LocalAction<any>>> = [
    trainAddReducer,
    trainChangeReducer,
    trainPositionReducer,
    switchReducer,
    signalLightReducer,
    trainSpeedReducer,
    switchAvailabilityReducer,
    (state) => stateObserver$.notify(state),
];

const actionSources: Array<ActionSource<State, StoreInterface>> = [
    addTrain,
    changeTrainDir,
    changeTrainSpeed,
    switchChanger,
    trainSensorSimulator,
];

const effects: Array<Effect<State>> = [
    addTrainEffect,
    signalLightsCalcEffect,
    trainSensorSimulatorEffect,
    trainPositionCalcSensorEffect,
    trainGreenGoEffect,
];

export function createStoreInterface(): StoreInterface {

    const initialStoreInterface: StoreInterface = {
        addTrain: noop,
        changeTrainDir: noop,
        changeTrainSpeed: noop,
        findTrainTouchingSegment$: () => () => undefined,
        switchChanger: noop,
        trainsList$: () => () => undefined,
    };

    const {context} = baseCreateStore<State, StoreInterface>(
        createInitialState(layoutId, deviceId),
        reducers,
        effects,
        actionSources,
        initialStoreInterface,
    );

    context.findTrainTouchingSegment$ = findTrainTouchingSegmentSelector$(stateObserver$);
    context.trainsList$ = trainsListSelector$(stateObserver$);
    return context;
}
