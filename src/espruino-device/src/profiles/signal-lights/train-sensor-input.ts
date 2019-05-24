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

