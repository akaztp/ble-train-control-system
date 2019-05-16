import { TrainDriverConfig } from '@logic/models/device-configs';
import { PinPair } from '../../pin-pair';

export interface DeviceConfig extends TrainDriverConfig<PinPair> {
}
