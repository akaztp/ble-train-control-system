import { ActionPayloadSwitch } from '@logic/state/action';

export interface StoreInterface {
  switchChange: (payload: ActionPayloadSwitch) => void,
}

export const storeInterfaceInjectorKey = 'StoreInterface';
