import { Id } from '@logic/models/base';
import { SwitchPosition } from '@logic/models/switch';

export interface StoreInterface {
  switchChanger: (
    switchId: Id,
    position: SwitchPosition,
    enabled: boolean,
  ) => void,
}

export const storeInterfaceInjectorKey = 'StoreInterface';
