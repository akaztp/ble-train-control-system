import { State } from '@logic/models/state';
import { initialState } from '@logic/state/initial-state';
import { ActionSource, Effect, createStore, Reducer } from '@logic/state/store';

const reducers: Reducer<State>[] = [

];

const effects: Effect<State>[] = [

];

const actionSources: ActionSource<State>[] = [

];

createStore<State>(
  initialState,
  reducers,
  effects,
  actionSources,
);
