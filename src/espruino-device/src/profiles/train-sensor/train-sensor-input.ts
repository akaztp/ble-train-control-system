import { TrainSensorConfig } from '@logic/models/device-configs';
import { BroadcastAction } from '@logic/state/action';
import { createActionTrainSensor } from '@logic/state/actions/train-sensor';

export function setupTrainSensors(
    config: Array<TrainSensorConfig<Pin>>,
    dispatcher: (action: BroadcastAction<any>) => void,
): void {
    const freq = 7; // Hz
    const clearDebounce = 2; // seg

    config.forEach((trainSensorConfig) => {
        const port = trainSensorConfig.port;
        let mean = analogRead(port);
        let sampleLength = 3 * freq; // seg * freq
        let clearCounter = 0;
        let valueSeq = 0;

        function readSensor() {
            let value = analogRead(port);
            if (global.logSensors) {
                console.log(trainSensorConfig.signalId, value, mean);
            }
            if (sampleLength > 0) {
                sampleLength--;
                mean = mean * 0.9 + value * 0.1;
            } else if ((mean - value) > 0.3 * mean) {
                valueSeq++;
                if (valueSeq === 3 && clearCounter === 0) {
                    clearCounter = clearDebounce * freq;
                    valueSeq = 0;
                    if (global.logSensors) {
                        console.log('Sensor: ', trainSensorConfig.signalId);
                    }
                    dispatcher(createActionTrainSensor({
                        state: true,
                        signalId: trainSensorConfig.signalId,
                        segId: trainSensorConfig.segId,
                    }));
                }
            } else {
                if (clearCounter !== 0) {
                    clearCounter--;
                }
                mean = mean * 0.9 + value * 0.1;
                valueSeq = 0;
            }
        }

        setInterval(readSensor, 1000 / freq);
    });
}
