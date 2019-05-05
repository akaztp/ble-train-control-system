import { StoreInterface } from '../store-interface';
import { getUniqueId, Id } from '@logic/models/base';
import { State } from '@logic/models/state';
import { createActionTrainAdd } from '@logic/state/action';
import { Dispatcher } from '@logic/state/store';

export function addTrain(
  state: State,
  dispatcher: Dispatcher,
  storeInterface: StoreInterface,
): StoreInterface {
  storeInterface.addTrain = (
    name: string,
    segmentId: Id,
  ): void => {
    const id = getUniqueId(state.trains);
    return dispatcher(createActionTrainAdd({id, name, segmentId}));
  };
  return storeInterface;
}
