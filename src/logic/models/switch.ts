import { Data, Id } from './base';

export interface Switch extends Data {
  id: Id;
  position: SwitchPosition | null;
}

export enum SwitchPosition {
  Straight = 0,
  Turnout = 1,
}
