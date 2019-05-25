import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainSpeed } from '@logic/state/actions/train-speed';
import { Effect, triggerEffectForAction } from '@logic/state/store';
import { DeviceState } from './device-state';
import { motorControl } from './motor-control';

const effect: Effect<DeviceState, BroadcastAction<any>> =
    (
        action: BroadcastAction<ActionPayloadTrainSpeed>,
        state: DeviceState,
    ): Array<BroadcastAction<any>> => {

        const {trainId, speed} = action.payload;
        const train = state.trains[trainId];
        if (train) {
            // TODO: use inverted dir

            // TODO: use driverDeviceId
            // if (train.driverDeviceId === state.currentDeviceId) {
            motorControl(speed, state.deviceConfig.trainDriver);
            // }
        }
        return [];
    };

export const trainDriverEffect: Effect<DeviceState, BroadcastAction<any>> =
    triggerEffectForAction<DeviceState, BroadcastAction<any>>(
        ActionType.TrainSpeed,
        effect,
    );
