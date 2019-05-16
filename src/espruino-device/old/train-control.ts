import { Train } from './train';

const pwmFreq = 500;
let interval: any;

export function setTrainSpeed(train: Train, speed: number): void {
    const lastSpeed = train.speed;
    train.speed = speed;
    cancelFloat();
    if (speed === 0) {
        if (lastSpeed === undefined) {
            float();
        } else {
            interval = setTimeout(float, 500);
            digitalWrite(train.forwardPins[0], 1);
            digitalWrite(train.forwardPins[1], 1);
        }
    } else if (speed > 0) {
        if (speed === 127) {
            digitalWrite(train.forwardPins[0], 1);
        } else {
            analogWrite(train.forwardPins[0], speed / 127, {soft: true, freq: pwmFreq});
        }
        digitalWrite(train.forwardPins[1], 0);
    } else if (speed < 0) {
        digitalWrite(train.forwardPins[0], 0);
        if (speed === -128) {
            digitalWrite(train.forwardPins[1], 1);
        } else {
            analogWrite(
                train.forwardPins[1],
                -speed / 128,
                {soft: true, freq: pwmFreq},
            );
        }
    }

    function float(): void {
        cancelFloat();
        digitalWrite(train.forwardPins[0], 0);
        digitalWrite(train.forwardPins[1], 0);
    }

    function cancelFloat(): void {
        if (interval) {
            clearTimeout(interval);
            interval = null;
        }
    }
}

export function initTrainControl(train: Train): void {
    pinMode(train.forwardPins[0], 'output', true);
    pinMode(train.forwardPins[1], 'output', true);
}
