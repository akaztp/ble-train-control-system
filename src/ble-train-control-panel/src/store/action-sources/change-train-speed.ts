import { Id } from '@logic/models/base';
import { State } from '@logic/models/state';
import { createActionTrainSpeed } from '@logic/state/actions/train-speed';
import { Dispatcher } from '@logic/state/store';
import { StoreInterface } from '../store-interface';

export function changeTrainSpeed(
    state: State,
    dispatcher: Dispatcher,
    storeInterface: StoreInterface,
): StoreInterface {
    storeInterface.changeTrainSpeed = (
        trainId: Id,
        speed: number,
    ): void => {
        return dispatcher(createActionTrainSpeed({
            trainId,
            speed,
            temporary: false,
        }));
    };
    return storeInterface;
}
