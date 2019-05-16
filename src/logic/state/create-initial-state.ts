import { segments } from '@layout/segments';
import { switches } from '@layout/switches';
import { State } from '@logic/state/state';

export function createInitialState<D>(
    currentDeviceId: string | null,
    deviceConfig: D,
): State<D> {
    return {
        segments: segments(),
        switches,
        trains: {},
        currentDeviceId,
        deviceConfig,
    };
}
