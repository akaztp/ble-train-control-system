import { Id } from '@logic/models/base';
import { SwitchPosition } from '@logic/models/switch';
import { ActionType, LocalAction, localActionCreator } from '@logic/state/action';

export interface ActionPayloadSwitch {
    switchId: Id;
    position: SwitchPosition;
    enabled: boolean;
}

export function createActionSwitch(
    payload: ActionPayloadSwitch,
): LocalAction<ActionPayloadSwitch> {
    return localActionCreator<ActionPayloadSwitch>(
        ActionType.Switch,
        payload,
    );
}
