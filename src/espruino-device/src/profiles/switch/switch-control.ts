import { SwitchPosition } from '@logic/models/switch';
import { PinPair } from '../../pin-pair';

const pwmFreq = 500;
const duration = 500;

export function switchControl(state: SwitchPosition, pins: PinPair): void {
    if (state === SwitchPosition.Straight) {
        digitalWrite(pins.b, 0);
        analogWrite(
            pins.a,
            0.5,
            {soft: true, freq: pwmFreq},
        );
    } else if (state === SwitchPosition.Turnout) {
        digitalWrite(pins.a, 0);
        analogWrite(
            pins.b,
            0.5,
            {soft: true, freq: pwmFreq},
        );
    }
    setTimeout(stop, duration);

    function stop() {
        digitalWrite(pins.a, 0);
        digitalWrite(pins.b, 0);
    }
}

export function setupSwitches(switches: { [key: number]: PinPair }): void {
    Object.keys(switches).forEach(k => {
        const pins = switches[k as any];
        pinMode(pins.a, 'output', true);
        pinMode(pins.b, 'output', true);
        switchControl(SwitchPosition.Straight, pins);
    });
}
