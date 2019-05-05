import { Id } from '@logic/models/base';
import { State } from '@logic/models/state';
import { SwitchPosition } from '@logic/models/switch';
import { createActionSwitch } from '@logic/state/action';
import { Dispatcher } from '@logic/state/store';
import { StoreInterface } from '../store-interface';

export function switchChanger(
  state: State,
  dispatcher: Dispatcher,
  storeInterface: StoreInterface,
): StoreInterface {
  storeInterface.switchChanger = (
    switchId: Id,
    position: SwitchPosition,
    enabled: boolean,
  ): void =>
    dispatcher(createActionSwitch({switchId, position, enabled}));
  return storeInterface;
}
