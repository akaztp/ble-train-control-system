import { ActionType } from '@logic/state/action';

export interface StoreAction<T> {
    type: number;
    payload: T;
}

export type Reducer<S, A extends StoreAction<any> = StoreAction<any>> = (state: S, action: A) => void;

export type Dispatcher<A> = (action: A) => void;

export type ActionSource<S, C, A> = (state: S, dispatcher: Dispatcher<A>, context: C) => C;

export type Effect<S, A extends StoreAction<any>> = (action: A, state: S) => Array<A>;

export interface Store<S, A extends StoreAction<any>> {
    state: S;
    reducers: Array<Reducer<S, A>>;
    effects: Array<Effect<S, A>>;
    dispatch: Dispatcher<A>;
}

export interface CreatedStore<S, C, A extends StoreAction<any>> {
    store: Store<S, A>;
    context: C;
}

export function createStore<S, C, A extends StoreAction<any> = StoreAction<any>>(
    state: S,
    reducers: Array<Reducer<S, A>>,
    effects: Array<Effect<S, A>>,
    actionSources: Array<ActionSource<S, C, A>>,
    initialContext: C,
): CreatedStore<S, C, A> {
    const dispatchQueue: Array<any> = [];

    function dispatch(action: A): void {
        dispatchQueue.push(action);
    }

    const store: Store<S, A> = {
        state,
        reducers,
        effects,
        dispatch,
    };

    function processDispatchQueue(): void {
        if (dispatchQueue.length) {
            const action = dispatchQueue.shift()!;
            // logAction(action);
            // setTimeout(logAction, 10, action);
            store.reducers.forEach((r) => r(store.state, action));
            // console.log('dispatch(). Updated state:', store.state);
            store.effects.forEach(
                (effect) => effect(action, store.state).forEach(
                    (newAction) => dispatch(newAction)));
        }
        setTimeout(processDispatchQueue, 20);
    }

    const context =
        actionSources.reduce(
            (prevContext, actionSource) => actionSource(store.state, store.dispatch, prevContext),
            initialContext,
        );

    store.dispatch({type: ActionType.Init, payload: null} as A);

    setTimeout(processDispatchQueue, 20);

    return {
        store,
        context,
    };
}

export function triggerEffectForAction<S, A extends StoreAction<any>>(
    types: ActionType | ActionType[],
    effect: Effect<S, A>,
): Effect<S, A> {
    return (action: A, state: S): Array<A> => {
        const isType = typeof (types) === 'object' ? types.indexOf(action.type) !== -1 : types === action.type;
        if (isType) {
            return effect(action, state);
        } else {
            return [];
        }
    };
}

function logAction(action: StoreAction<any>): void {
    const logActionType = [
        'Init',
        'TrainJoin',
        'TrainAdd',
        'TrainName',
        'TrainDriverId',
        'TrainInvertDir',
        'TrainPosition',
        'TrainSpeed',
        'Switch',
        'SignalLight',
        'TrainSensor',
    ];
    console.log('ACTION: ', logActionType[action.type], action.payload);
}


