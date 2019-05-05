import { getUniqueId, Id } from '@logic/models/base';
import { State } from '@logic/models/state';
import { createActionTrainAdd } from '@logic/state/actions/train-add';
import { Dispatcher } from '@logic/state/store';
import { StoreInterface } from '../store-interface';

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
