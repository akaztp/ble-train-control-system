export interface StoreAction<T> {
  type: number;
  payload: T;
}

export type Reducer<S, A extends StoreAction<any> = StoreAction<any>> = (state: S, action: A) => void;

export type Dispatcher = (action: StoreAction<any>) => void;

export type ActionSource<S, C> = (state: S, dispatcher: Dispatcher, context: C) => C;

export type Effect<S> = (action: StoreAction<any>, state: S) => Array<StoreAction<any>>;

export interface Store<S> {
  state: S;
  reducers: Array<Reducer<S, any>>;
  effects: Array<Effect<S>>;
  dispatcher: Dispatcher;
}

export interface CreatedStore<S, C> {
  store: Store<S>;
  context: C;
}

export function createStore<S, C>(
  state: S,
  reducers: Array<Reducer<S, any>>,
  effects: Array<Effect<S>>,
  actionSources: Array<ActionSource<S, C>>,
  initialContext: C,
): CreatedStore<S, C> {
  const store: Store<S> = {
    state,
    reducers,
    effects,
    dispatcher,
  };

  const context =
    actionSources.reduce(
      (prevContext, actionSource) => actionSource(store.state, store.dispatcher, prevContext),
      initialContext);

  return {
    store,
    context,
  };

  function dispatcher(action: StoreAction<any>): void {
    console.log('dispatcher(). action: ', action);
    store.reducers.forEach((r) => r(store.state, action));
    store.effects.forEach(
      (effect) => effect(action, store.state).forEach(
        (newAction) => dispatcher(newAction)));
  }
}
