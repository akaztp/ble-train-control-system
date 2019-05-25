import { TrainSensorConfig } from '@logic/models/device-configs';
import { BroadcastAction } from '@logic/state/action';
import { createActionTrainSensor } from '@logic/state/actions/train-sensor';

export function setupTrainSensors(
    config: Array<TrainSensorConfig<Pin>>,
    dispatcher: (action: BroadcastAction<any>) => void,
): void {
    config.forEach((trainSensorConfig) => {
        setWatch(
            () => {
                console.log('Button pressed');
                dispatcher(createActionTrainSensor({
                    segId: trainSensorConfig.segId,
                    signalId: trainSensorConfig.signalId,
                    state: true,
                }));
            },
            trainSensorConfig.port,
            {
                repeat: true,
                edge: 'falling',
                debounce: 100,
                data: trainSensorConfig.port,
            },
        );
    });
}

var w1;
var ledLastState = false;

function pulOn() {
    analogWrite(D13, 0.5, {freq: 38000, soft: true});
    analogWrite(D12, 0.01, {freq: 10, soft: true});
}

function pulOff() {
    digitalWrite(D13, 0);
    digitalWrite(D12, 0);
}

function rxIR(e) {
    ledLastState = !ledLastState;
    digitalWrite(D7, ledLastState);
}

function txIR() {
    stopIR();
    pinMode(D15, 'input');
    pulOn();
    w1 = setWatch(rxIR, D15, {repeat: true, edge: 'rising', debounce: 0});
}

function stopIR() {
    pulOff();
    if (w1) {
        clearWatch(w1);
        w1 = null;
    }
}
