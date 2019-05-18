import {BroadcastAction} from '@logic/state/action';
import {actionToBroadcast} from '../../broadcast/action-to-broadcast';
import {DeviceState} from './device-state';

export function broadcasterEffect(
    action: BroadcastAction<any>,
    state: DeviceState,
): Array<BroadcastAction<any>> {
    if (!action.isBroadcasted) {
        actionToBroadcast(action);
        action.isBroadcasted = true;
    }
    return [];
}
