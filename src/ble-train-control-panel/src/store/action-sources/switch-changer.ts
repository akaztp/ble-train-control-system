import { Id } from '@logic/models/base';
import { SwitchPosition } from '@logic/models/switch';
import { BroadcastAction } from '@logic/state/action';
import { createActionSwitch } from '@logic/state/actions/switch';
import { Dispatcher } from '@logic/state/store';
import { DeviceState } from '../device-state';
import { StoreInterface } from '../store-interface';

export function switchChanger(
    state: DeviceState,
    dispatcher: Dispatcher<BroadcastAction<any>>,
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
