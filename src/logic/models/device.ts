import { Data, Id } from './base';

export interface Device extends Data {
  id: Id;
    macAddr: string;
}
