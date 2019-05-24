import { Id } from '@logic/models/base';
import { BroadcastAction } from '@logic/state/action';
import { createActionTrainInvertDir } from '@logic/state/actions/train-invert-dir';
import { Dispatcher } from '@logic/state/store';
import { DeviceState } from '../device-state';
import { StoreInterface } from '../store-interface';

export function changeTrainDir(
    state: DeviceState,
    dispatcher: Dispatcher<BroadcastAction<any>>,
    storeInterface: StoreInterface,
): StoreInterface {
    storeInterface.changeTrainDir = (
        trainId: Id,
        invertedDir: boolean,
    ): void => {
        return dispatcher(createActionTrainInvertDir({
            trainId,
            invDir: invertedDir,
        }));
    };
    return storeInterface;
}
