import { Train } from './train';
import { initTrainControl, setTrainSpeed } from './train-control';

export function setServices(trainControl: Train) {
    initTrainControl(trainControl);

    NRF.setServices(
        {
            '7c600000-58bc-4dda-a919-f2b253869809': {
                '7c600001-58bc-4dda-a919-f2b253869809': {
                    description: 'Motor Control',
                    writable: true,
                    onWrite: trainMotorService,
                },
            },
        },
        {
            uart: true,
        },
    );

    function trainMotorService(evt) {
        setTrainSpeed(trainControl, evt.data[0] - 128);
    }
}
