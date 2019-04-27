import { State } from '@logic/models/state';
import { initialState } from '@logic/state/initial-state';
import { ActionSource, Effect, initStore, Reducer } from '@logic/state/store';

const reducers: Reducer<State>[] = [

];

const effects: Effect<State>[] = [

];

const actionSources: ActionSource<State>[] = [

];

initStore<State>(
  initialState,
  reducers,
  effects,
  actionSources,
);
