import { addTrain } from '@/store/action-sources/add-train';
import { changeTrainSpeed } from '@/store/action-sources/change-train-speed';
import { switchChanger } from '@/store/action-sources/switch-changer';
import { addTrainEffect } from '@/store/effects/add-train-effect';
import { Observer } from '@/store/observer';
import { trainAddReducer } from '@/store/reducers/train-add-reducer';
import { findTrainTouchingSegmentSelector$ } from '@/store/selectors/find-train-touching-segment-selector';
import { trainsListSelector$ } from '@/store/selectors/trains-list-selector';
import { StoreInterface } from '@/store/store-interface';
import { layoutId } from '@layout/layout-id';
import { State } from '@logic/models/state';
import { LocalAction } from '@logic/state/action';
import { createInitialState } from '@logic/state/create-initial-state';
import { signalLightsCalcEffect } from '@logic/state/effects/signal-lights-calc-effect';
import { signalLightReducer } from '@logic/state/reducers/signal-light-reducer';
import { switchReducer } from '@logic/state/reducers/switch-reducer';
import { trainPositionReducer } from '@logic/state/reducers/train-position-reducer';
import { trainSpeedReducer } from '@logic/state/reducers/train-speed-reducer';
import { ActionSource, createStore as baseCreateStore, Effect, Reducer } from '@logic/state/store';
import { noop } from 'vue-class-component/lib/util';

export const deviceId = '????';

const stateObserver$ = new Observer<State>();

const reducers: Array<Reducer<State, LocalAction<any>>> = [
  trainAddReducer,
  trainPositionReducer,
  switchReducer,
  signalLightReducer,
  trainSpeedReducer,
  (state, _action) => stateObserver$.notify(state),
];

const actionSources: Array<ActionSource<State, StoreInterface>> = [
  addTrain,
  changeTrainSpeed,
  switchChanger,
];

const effects: Array<Effect<State>> = [
  addTrainEffect,
  signalLightsCalcEffect,
];


export function createStoreInterface(): StoreInterface {

  const initialStoreInterface: StoreInterface = {
    addTrain: noop,
    changeTrainSpeed: noop,
    findTrainTouchingSegment$: () => () => undefined,
    switchChanger: noop,
    trainsList$: () => () => undefined,
  };

  const {store, context} = baseCreateStore<State, StoreInterface>(
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
