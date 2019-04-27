export interface StoreAction<T> {
  type: number;
  payload: T;
}

export type Reducer<S> = (action: StoreAction<any>, state: S) => S;

export type Dispatcher = (action: StoreAction<any>) => void;

export type ActionSource<S> = (state: S, dispatcher: Dispatcher) => void;

export type Effect<S> = (action: StoreAction<any>, state: S) => StoreAction<any>[];

export interface Store<S> {
  state: S;
  reducers: Reducer<S>[];
  effects: Effect<S>[];
  dispatcher: Dispatcher;
}

export function createStore<S>(
  state: S,
  reducers: Reducer<S>[],
  effects: Effect<S>[],
  actionSources: ActionSource<S>[],
) {
  const store: Store<S> = {
    state,
    reducers,
    effects,
    dispatcher,
  };

  actionSources.forEach(actionSource => actionSource(store.state, store.dispatcher));

  return;

  function dispatcher<S>(action: StoreAction<any>): void {
    store.reducers.forEach(r => r(action, store.state));
    store.effects.forEach(
      effect => effect(action, store.state).forEach(
        newAction => dispatcher(newAction)));
  }
}
