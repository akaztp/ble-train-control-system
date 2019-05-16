export interface TrainDriverConfig<P> {
    trainDriver: P;
}

export interface SignalLightsConfig<P> {
    signalLights: { [key: number]: P };
}

export interface SwitchesConfig<P> {
    switches: { [key: number]: P };
}
