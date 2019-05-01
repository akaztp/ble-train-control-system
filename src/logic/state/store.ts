import { ActionType } from '@logic/state/action';

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
  dispatch: Dispatcher;
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
    dispatch,
  };

  const context =
    actionSources.reduce(
      (prevContext, actionSource) => actionSource(store.state, store.dispatch, prevContext),
      initialContext,
    );

  store.dispatch({type: ActionType.Init, payload: null} as StoreAction<null>);

  return {
    store,
    context,
  };

  function dispatch(action: StoreAction<any>): void {
    console.log('dispatch(). action: ', action);
    store.reducers.forEach((r) => r(store.state, action));
    console.log('dispatch(). Updated state:', store.state);
    store.effects.forEach(
      (effect) => effect(action, store.state).forEach(
        (newAction) => dispatch(newAction)));
  }
}

export function triggerEffectForAction<S>(types: ActionType | ActionType[], effect: Effect<S>): Effect<S> {
  return (action: StoreAction<any>, state: S): Array<StoreAction<any>> => {
    const isType = typeof(types) === 'object' ? types.indexOf(action.type) !== -1 : types === action.type;
    if (isType) {
      return effect(action, state);
    } else {
      return [];
    }
  };
}
