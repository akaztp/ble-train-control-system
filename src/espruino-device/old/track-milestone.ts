import { addSample, initBuffer, SamplingBuffer } from './sampling';

export interface TrackMilestone {
    id: string;
    deviceId: string;
    rssiSampling: SamplingBuffer;
    rssiThreshold: number;
}

export function initTrackMilestone(
    id: string,
    deviceId: string,
    rssiThreshold: number,
): TrackMilestone {
    return {
        id,
        deviceId,
        rssiSampling: initBuffer(1),
        rssiThreshold,
    } as TrackMilestone;
}

export function hittedMilestone(
    newSensedDevice: BluetoothDevice,
    milestones: TrackMilestone[],
): TrackMilestone | null | undefined {

    const milestone = findMilestone(newSensedDevice.id, milestones);
    if (milestone === null) {
        return;
    }

    const rssi = addSample(milestone.rssiSampling, -newSensedDevice.rssi);
    // console.log(rssi);
    return rssi < -milestone.rssiThreshold ? milestone : null;
}

function findMilestone(
    id: string,
    milestones: TrackMilestone[],
): TrackMilestone | null {
    return milestones.find(m => m.deviceId === id) || null;
}
