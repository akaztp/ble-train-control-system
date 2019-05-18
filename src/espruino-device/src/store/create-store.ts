import { BroadcastAction } from '@logic/state/action';
import { trainAddReducer } from '@logic/state/reducers/train-add-reducer';
import { trainInvertDirReducer } from '@logic/state/reducers/train-invert-dir-reducer';
import { trainSpeedReducer } from '@logic/state/reducers/train-speed-reducer';
import { State } from '@logic/state/state';
import { ActionSource, CreatedStore, createStore as baseCreateStore, Effect, Reducer } from '@logic/state/store';

export interface StoreInterface {
}

export function createDeviceStore<D>(
    initialState: State<D>,
    additionalEffects: Array<Effect<State<D>, BroadcastAction<any>>>,
): CreatedStore<State<D>, StoreInterface, BroadcastAction<any>> {

    const reducers: Array<Reducer<State<D>, BroadcastAction<any>>> = [
        trainAddReducer,
        trainInvertDirReducer,
        trainSpeedReducer,
    ];

    const actionSources: Array<ActionSource<State<D>, StoreInterface, BroadcastAction<any>>> = [];

    const effects: Array<Effect<State<D>, BroadcastAction<any>>> = [
        ...additionalEffects,
    ];

    const initialStoreInterface: StoreInterface = {};

    const createdStore = baseCreateStore<State<D>, StoreInterface, BroadcastAction<any>>(
        initialState,
        reducers,
        effects,
        actionSources,
        initialStoreInterface,
    );

    return createdStore;
}