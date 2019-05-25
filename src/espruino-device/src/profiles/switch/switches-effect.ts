import { SwitchesConfig } from '@logic/models/device-configs';
import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadSwitch } from '@logic/state/actions/switch';
import { State } from '@logic/state/state';
import { Effect, triggerEffectForAction } from '@logic/state/store';
import { PinPair } from '../../pin-pair';
import { switchControl } from './switch-control';

const effect: Effect<State<SwitchesConfig<PinPair>>, BroadcastAction<any>> =
    (
        action: BroadcastAction<ActionPayloadSwitch>,
        state: State<SwitchesConfig<PinPair>>,
    ): Array<BroadcastAction<any>> => {
        const {switchId, pos} = action.payload;
        const pins = state.deviceConfig.switches[switchId];
        if (pins) {
            switchControl(pos, pins);
        }
        return [];
    };

export const switchesEffect: Effect<State<SwitchesConfig<PinPair>>, BroadcastAction<any>> =
    triggerEffectForAction<State<SwitchesConfig<PinPair>>, BroadcastAction<any>>(
        ActionType.Switch,
        effect,
    );
