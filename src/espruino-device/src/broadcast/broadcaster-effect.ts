import { BroadcastAction } from '@logic/state/action';
import { State } from '@logic/state/state';
import { actionToBroadcast } from './action-to-broadcast';

export function broadcasterEffect(
    action: BroadcastAction<any>,
    state: State<any>,
): Array<BroadcastAction<any>> {
    if (!action.isBroadcasted) {
        actionToBroadcast(action);
        action.isBroadcasted = true;
    }
    return [];
}
