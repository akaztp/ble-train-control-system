import {PinPair} from '../../pin-pair';
import {SignalLightState} from "@logic/models/signal-light";

export function signalLightControl(state: SignalLightState, pins: PinPair): void {
    if (state === SignalLightState.Green) {
        digitalWrite(pins.a, 1);
        digitalWrite(pins.b, 0);
    } else if (state === SignalLightState.Red) {
        digitalWrite(pins.a, 0);
        digitalWrite(pins.b, 1);
    }
}

export function initSignalLights(signalLights: { [key: number]: PinPair }): void {
    Object.keys(signalLights).forEach(k => {
        const pins = signalLights[k as any];
        pinMode(pins.a, 'output', true);
        pinMode(pins.b, 'output', true);
        signalLightControl(SignalLightState.Red, pins);
    });
}
