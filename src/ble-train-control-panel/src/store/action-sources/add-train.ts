import { getUniqueId, Id } from '@logic/models/base';
import { BroadcastAction } from '@logic/state/action';
import { createActionTrainJoin } from '@logic/state/actions/train-join';
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
        return dispatcher(createActionTrainJoin({trainId, name, segmentId}));
    };
    return storeInterface;
}
