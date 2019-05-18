import { PinPair } from '../../pin-pair';

const pwmFreq = 500;
let intervalTimer: number | null = null;
let lastSpeed: number;

export function motorControl(speed: number, pins: PinPair): void {
    cancelFloat();
    if (speed === 0) {
        if (lastSpeed === undefined) {
            float();
        } else {
            intervalTimer = setTimeout(float, 500);
            digitalWrite(pins.a, 1);
            digitalWrite(pins.b, 1);
        }
    } else if (speed > 0) {
        if (speed === 1) {
            digitalWrite(pins.a, 1);
        } else {
            analogWrite(pins.a, speed, {soft: true, freq: pwmFreq});
        }
        digitalWrite(pins.b, 0);
    } else if (speed < 0) {
        digitalWrite(pins.a, 0);
        if (speed === -1) {
            digitalWrite(pins.b, 1);
        } else {
            analogWrite(
                pins.b,
                -speed,
                {soft: true, freq: pwmFreq},
            );
        }
    }

    lastSpeed = speed;

    function float(): void {
        cancelFloat();
        digitalWrite(pins.a, 0);
        digitalWrite(pins.b, 0);
    }

    function cancelFloat(): void {
        if (intervalTimer) {
            clearTimeout(intervalTimer);
            intervalTimer = null;
        }
    }
}

export function initTrainControl(pins: PinPair): void {
    pinMode(pins.a, 'output', true);
    pinMode(pins.b, 'output', true);
}
