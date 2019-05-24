import { Id } from '@logic/models/base';

export interface TrainDriverConfig<P> {
    trainDriver: P;
}

export interface SignalLightsConfig<P> {
    signalLights: { [key: number]: P };
}

export interface SwitchesConfig<P> {
    switches: { [key: number]: P };
}

export interface TrainSensorConfig<P> {
    signalId: Id;
    segId: Id;
    port: P;
}

export interface TrainSensorsConfig<P> {
    trainSensors: Array<TrainSensorConfig<P>>;
}
