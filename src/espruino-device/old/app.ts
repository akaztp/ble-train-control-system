import { setServices } from './ble-services';
import { milestones, trainControl } from './config';
import { hittedMilestone } from './track-milestone';
import { setTrainSpeed } from './train-control';

let scanCount = 0;
let lastRateTime = 0;

function calculateRate(): void {
    scanCount++;
    if (scanCount > 50) {
        const now = Date.now();
        // console.log('Rate: ', scanCount / (now - lastRateTime) * 1000);
        lastRateTime = now;
        scanCount = 0;
    }
}

function handleBLEScan(device: BluetoothDevice) {
    calculateRate();
    const milestoneHit = hittedMilestone(device, milestones);
    if (milestoneHit !== undefined) {
        if (milestoneHit !== null) {
            setTrainSpeed(trainControl, 0);
        }
    }
}

function onInit(): void {
    console.log('Starting');
    setServices(trainControl);
    D7.write(true);
    lastRateTime = Date.now();
    NRF.setScan(handleBLEScan);
}
