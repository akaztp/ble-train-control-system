import { Id } from '@logic/models/base';
import { State } from '@logic/models/state';
import { createActionTrainChange } from '@logic/state/actions/train-change';
import { Dispatcher } from '@logic/state/store';
import { StoreInterface } from '../store-interface';

export function changeTrainDir(
    state: State,
    dispatcher: Dispatcher,
    storeInterface: StoreInterface,
): StoreInterface {
    storeInterface.changeTrainDir = (
        trainId: Id,
        invertedDir: boolean,
    ): void => {
        return dispatcher(createActionTrainChange({
            trainId,
            invertedDir,
        }));
    };
    return storeInterface;
}
