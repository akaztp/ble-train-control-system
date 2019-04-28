import { layoutId } from '@layout/layout-id';
import { Id } from '@logic/models/base';
import { SignalLightState } from '@logic/models/signal-light';
import { SwitchPosition } from '@logic/models/switch';
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
    layoutId: layoutId,
    timestamp: Date.now(),
    isBroadcasted: false,
    type,
    payload,
  } as LocalAction<P>;
}

export enum ActionType {
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

export function createActionTrainPosition(
  payload: ActionPayloadTrainPosition,
): LocalAction<ActionPayloadTrainPosition> {
  return localActionCreator<ActionPayloadTrainPosition>(
    ActionType.TrainPosition,
    payload,
  );
}

export interface ActionPayloadTrainSpeed {
  speed: number;
}

export function createActionTrainSpeed(
  payload: ActionPayloadTrainSpeed,
): LocalAction<ActionPayloadTrainSpeed> {
  return localActionCreator<ActionPayloadTrainSpeed>(
    ActionType.TrainSpeed,
    payload,
  );
}

export interface ActionPayloadSwitch {
  switchId: Id;
  position: SwitchPosition;
  enabled: boolean;
}

export function createActionSwitch(
  payload: ActionPayloadSwitch,
): LocalAction<ActionPayloadSwitch> {
  return localActionCreator<ActionPayloadSwitch>(
    ActionType.Switch,
    payload,
  );
}

export interface ActionPayloadSignalLight {
  segmentId: Id;
  signalId: Id;
  state: SignalLightState;
}

export function createActionSignalLight(
  payload: ActionPayloadSignalLight,
): LocalAction<ActionPayloadSignalLight> {
  return localActionCreator<ActionPayloadSignalLight>(
    ActionType.SignalLight,
    payload,
  );
}

export interface ActionPayloadTrainSensor {
  segmentId: Id;
  state: boolean;
  signalId: Id;
}

export function createActionTrainSensor(
  payload: ActionPayloadTrainSensor,
): LocalAction<ActionPayloadTrainSensor> {
  return localActionCreator<ActionPayloadTrainSensor>(
    ActionType.TrainSensor,
    payload,
  );
}
