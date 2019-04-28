import { StoreInterface } from '@/store/store-interface';
import { State } from '@logic/models/state';
import { ActionPayloadSwitch, createActionSwitch } from '@logic/state/action';
import { Dispatcher } from '@logic/state/store';

export const switchChanger =
  (state: State, dispatcher: Dispatcher, storeInterface: StoreInterface) => {
    storeInterface.switchChange = (payload: ActionPayloadSwitch): void =>
      dispatcher(createActionSwitch(payload));
    return storeInterface;
  };
