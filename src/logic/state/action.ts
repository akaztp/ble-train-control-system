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
  trainId: Id,
  segmentId: Id,
  enteringSegmentId: Id,
): LocalAction<ActionPayloadTrainPosition> {
  return localActionCreator<ActionPayloadTrainPosition>(
    ActionType.TrainPosition,
    {
      trainId,
      segmentId,
      enteringSegmentId,
    },
  );
}

export interface ActionPayloadTrainSpeed {
  speed: number;
}

export function createActionTrainSpeed(
  speed: number,
): LocalAction<ActionPayloadTrainSpeed> {
  return localActionCreator<ActionPayloadTrainSpeed>(
    ActionType.TrainSpeed,
    {
      speed,
    },
  );
}

export interface ActionPayloadSwitch {
  switchId: Id;
  position: SwitchPosition;
  enabled: boolean;
}

export function createActionSwitch(
  switchId: Id,
  position: SwitchPosition,
  enabled: boolean,
): LocalAction<ActionPayloadSwitch> {
  return localActionCreator<ActionPayloadSwitch>(
    ActionType.Switch,
    {
      switchId,
      position,
      enabled,
    },
  );
}

export interface ActionPayloadSignalLight {
  segmentId: Id;
  signalId: Id;
  state: SignalLightState;
}

export function createActionSignalLight(
  segmentId: Id,
  signalId: Id,
  state: SignalLightState,
): LocalAction<ActionPayloadSignalLight> {
  return localActionCreator<ActionPayloadSignalLight>(
    ActionType.SignalLight,
    {
      segmentId,
      signalId,
      state,
    },
  );
}

export interface ActionPayloadTrainSensor {
  segmentId: Id;
  state: boolean;
  signalId: Id;
}

export function createActionTrainSensor(
  segmentId: Id,
  state: boolean,
  signalId: Id,
): LocalAction<ActionPayloadTrainSensor> {
  return localActionCreator<ActionPayloadTrainSensor>(
    ActionType.TrainSensor,
    {
      segmentId,
      state,
      signalId,
    },
  );
}
