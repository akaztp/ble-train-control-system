export interface StoreAction<T> {
  type: number;
  payload: T;
}

export type Reducer<S, A extends StoreAction<any> = StoreAction<any>> = (state: S, action: A) => void;

export type Dispatcher = (action: StoreAction<any>) => void;

export type ActionSource<S> = (state: S, dispatcher: Dispatcher) => void;

export type Effect<S> = (action: StoreAction<any>, state: S) => StoreAction<any>[];

export interface Store<S> {
  state: S;
  reducers: Reducer<S, any>[];
  effects: Effect<S>[];
  dispatcher: Dispatcher;
}

export function createStore<S>(
  state: S,
  reducers: Reducer<S, any>[],
  effects: Effect<S>[],
  actionSources: ActionSource<S>[],
): Store<S> {
  const store: Store<S> = {
    state,
    reducers,
    effects,
    dispatcher,
  };

  actionSources.forEach(actionSource => actionSource(store.state, store.dispatcher));

  return store;

  function dispatcher<S>(action: StoreAction<any>): void {
    console.log('dispatcher(). action: ', action);
    store.reducers.forEach(r => r(store.state, action));
    store.effects.forEach(
      effect => effect(action, store.state).forEach(
        newAction => dispatcher(newAction)));
  }
}
