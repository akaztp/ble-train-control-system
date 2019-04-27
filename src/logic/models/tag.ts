import { Data, Id } from './base';
import { Device } from './device';
import { SignalLight } from './signal-light';

export interface Tag extends Data {
  id: Id;
  device: Device;
  signalLight: SignalLight;
}
