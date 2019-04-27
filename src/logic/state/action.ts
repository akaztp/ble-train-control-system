import { Id } from '@logic/models/base';
import { StoreAction } from '@logic/state/store';

export interface BroadcastAction<T> extends StoreAction<T> {
  layoutId: Id;
  timestamp: number;
}

export interface LocalAction<T> extends BroadcastAction<T> {
   isBroadcasted: boolean;
}
