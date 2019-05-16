import { getUniqueId, Id } from '@logic/models/base';
import { BroadcastAction } from '@logic/state/action';
import { createActionTrainAdd } from '@logic/state/actions/train-add';
import { Dispatcher } from '@logic/state/store';
import { DeviceState } from '../device-state';
import { StoreInterface } from '../store-interface';

export function addTrain(
    state: DeviceState,
    dispatcher: Dispatcher<BroadcastAction<any>>,
    storeInterface: StoreInterface,
): StoreInterface {
    storeInterface.addTrain = (
        name: string,
        segmentId: Id,
    ): void => {
        const trainId = getUniqueId(state.trains);
        return dispatcher(createActionTrainAdd({trainId, name, segmentId}));
    };
    return storeInterface;
}
