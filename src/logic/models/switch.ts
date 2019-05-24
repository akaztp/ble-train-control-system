import { Data, Id } from './base';

export interface Switch extends Data {
  id: Id;
    pos: SwitchPosition;
  enabled: boolean;
}

export enum SwitchPosition {
  Straight = 0,
  Turnout = 1,
}
