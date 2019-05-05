import { layoutId } from '@layout/layout-id';
import { Id } from '@logic/models/base';
import { StoreAction } from '@logic/state/store';

export interface BroadcastAction<P> extends StoreAction<P> {
  layoutId: Id;
  timestamp: number;
  payload: P;
}

export interface LocalAction<P> extends BroadcastAction<P> {
  isBroadcasted: boolean;
}

export function localActionCreator<P>(
  type: ActionType, payload: P): LocalAction<P> {
  return {
    layoutId,
    timestamp: Date.now(),
    isBroadcasted: false,
    type,
    payload,
  } as LocalAction<P>;
}

export enum ActionType {
  Init = 0,
  TrainAdd = 1,
  TrainChange,
  TrainPosition,
  TrainSpeed,
  Switch,
  SignalLight,
  TrainSensor,
}
