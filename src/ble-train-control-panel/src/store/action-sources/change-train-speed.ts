import { StoreInterface } from '@/store/store-interface';
import { Id } from '@logic/models/base';
import { State } from '@logic/models/state';
import { createActionTrainSpeed } from '@logic/state/action';
import { Dispatcher } from '@logic/state/store';

export function changeTrainSpeed(
  state: State,
  dispatcher: Dispatcher,
  storeInterface: StoreInterface,
): StoreInterface {
  storeInterface.changeTrainSpeed = (
    trainId: Id,
    speed: number,
  ): void => {
    return dispatcher(createActionTrainSpeed({trainId, speed}));
  };
  return storeInterface;
}
