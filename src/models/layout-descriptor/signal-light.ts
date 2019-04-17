import { Data, Id } from '../base';

export interface SignalLight extends Data {
  id: Id;
  state: SignalLightState;
}

export enum SignalLightState {
  Green = 0,
  Red = 1,
}
