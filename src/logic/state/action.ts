import { Id } from '@logic/models/base';
import { SignalLightState } from '@logic/models/signal-light';
import { SwitchPosition } from '@logic/models/switch';
import { StoreAction } from '@logic/state/store';

export interface BroadcastAction<T> extends StoreAction<T> {
  layoutId: Id;
  timestamp: number;
  payload: T;
}

export interface LocalAction<T> extends BroadcastAction<T> {
  isBroadcasted: boolean;
}

enum ActionTypes {
  TrainPosition = 1,
  TrainSpeed,
  Switch,
  SignalLight,
  TrainSensor,
}


export interface ActionPayloadTrainPosition {
  trainId: Id;
  segmentId: Id;
  enteringSegmentId: Id;
}

export interface ActionTrainPosition
  extends LocalAction<ActionPayloadTrainPosition> {
}

export interface ActionPayloadTrainSpeed {
  speed: number;
}

export interface ActionTrainSpeed
  extends LocalAction<ActionPayloadTrainSpeed> {
}

export interface ActionPayloadSwitch {
  switchId: Id;
  position: SwitchPosition;
  enabled: boolean;
}

export interface ActionSwitch
  extends LocalAction<ActionPayloadSwitch> {
}

export interface ActionPayloadSignalLight {
  segmentId: Id;
  signalId: Id;
  state: SignalLightState;
}

export interface ActionSignalLight
  extends LocalAction<ActionPayloadSignalLight> {
}

export interface ActionPayloadTrainSensor {
  state: boolean;
  segmentId: Id;
  signalId: Id;
}
