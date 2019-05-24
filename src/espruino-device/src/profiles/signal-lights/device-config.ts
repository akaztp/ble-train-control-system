import { SignalLightsConfig, TrainSensorsConfig } from '@logic/models/device-configs';
import { PinPair } from '../../pin-pair';

export interface DeviceConfig extends SignalLightsConfig<PinPair>, TrainSensorsConfig<Pin> {
}
