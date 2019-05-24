import { Id } from '@logic/models/base';
import { BroadcastAction } from '@logic/state/action';
import { createActionTrainSpeed } from '@logic/state/actions/train-speed';
import { Dispatcher } from '@logic/state/store';
import { DeviceState } from '../device-state';
import { StoreInterface } from '../store-interface';

export function changeTrainSpeed(
    state: DeviceState,
    dispatcher: Dispatcher<BroadcastAction<any>>,
    storeInterface: StoreInterface,
): StoreInterface {
    storeInterface.changeTrainSpeed = (
        trainId: Id,
        speed: number,
    ): void => {
        return dispatcher(createActionTrainSpeed({
            trainId,
            speed,
            temp: false,
        }));
    };
    return storeInterface;
}
