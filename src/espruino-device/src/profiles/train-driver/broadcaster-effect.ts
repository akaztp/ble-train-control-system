import { BroadcastAction } from '@logic/state/action';
import { Effect } from '@logic/state/store';
import { actionToBroadcast } from '../../broadcast/action-to-broadcast';
import { actionToSerial } from '../../serial';
import { DeviceState } from './device-state';

export const broadcasterEffectFactory: (serial: Serial) => Effect<DeviceState, BroadcastAction<any>> =
    (serial) => (action, state) => broadcasterEffect(action, state, serial);

function broadcasterEffect(
    action: BroadcastAction<any>,
    state: DeviceState,
    serial: Serial,
): Array<BroadcastAction<any>> {
    if (!action.isBroadcasted) {
        actionToBroadcast(action);
        actionToSerial(serial, action);
        action.isBroadcasted = true;
    }
    return [];
}
