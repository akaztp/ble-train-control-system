import { layoutId } from '@layout/layout-id';
import { StoreAction } from '@logic/state/store';

export interface BroadcastAction<P> extends StoreAction<P> {
    type: ActionType,
    layoutId: string;
    isBroadcasted: boolean;
}

export function localActionCreator<P>(
    type: ActionType, payload: P): BroadcastAction<P> {
    return {
        layoutId,
        isBroadcasted: false,
        type,
        payload,
    } as BroadcastAction<P>;
}

export enum ActionType {
    Init = 0,
    TrainJoin,
    TrainAdd,
    TrainName,
    TrainDriverId,
    TrainInvertDir,
    TrainPosition,
    TrainSpeed,
    Switch,
    SignalLight,
    TrainSensor,
}

export function isActionOfType<P>(
    action: BroadcastAction<P>,
    type: ActionType,
): action is BroadcastAction<P> {
    return action.type === type;
}
