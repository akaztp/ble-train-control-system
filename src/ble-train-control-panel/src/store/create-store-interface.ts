import { switchChanger } from '@/store/action-sources/switch-changer';
import { findTrainTouchingSegment } from '@/store/selectors/find-train-touching-segment';
import { StoreInterface } from '@/store/store-interface';
import { layoutId } from '@layout/layout-id';
import { State } from '@logic/models/state';
import { LocalAction } from '@logic/state/action';
import { createInitialState } from '@logic/state/create-initial-state';
import { switchReducer } from '@logic/state/reducers/switch-reducer';
import { trainAddReducer } from '@logic/state/reducers/train-add-reducer';
import { trainPositionReducer } from '@logic/state/reducers/train-position-reducer';
import {
  ActionSource,
  createStore as baseCreateStore,
  Effect,
  Reducer,
} from '@logic/state/store';
import { noop } from 'vue-class-component/lib/util';

export const deviceId = '????';

const reducers: Reducer<State, LocalAction<any>>[] = [
  trainAddReducer,
  trainPositionReducer,
  switchReducer,
];

const actionSources: ActionSource<State, StoreInterface>[] = [
  switchChanger,
];

const effects: Effect<State>[] = [];

export function createStoreInterface(): StoreInterface {
  const initialStoreInterface: StoreInterface = {
    switchChanger: noop,
    findTrainTouchingSegment: () => null,
  };

  const {store, context} = baseCreateStore<State, StoreInterface>(
    createInitialState(layoutId, deviceId),
    reducers,
    effects,
    actionSources,
    initialStoreInterface,
  );

  context.findTrainTouchingSegment = findTrainTouchingSegment(store.state);
  return context;
}
