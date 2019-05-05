import { State } from '@logic/models/state';
import { ActionType, LocalAction } from '@logic/state/action';
import { ActionPayloadSwitch } from '@logic/state/actions/switch';
import { Reducer } from '@logic/state/store';

export const switchReducer: Reducer<State, LocalAction<ActionPayloadSwitch>> =
  (state, action): void => {
    if (action.type === ActionType.Switch) {
      {
        const sw = state.switches[action.payload.switchId];
        sw.position = action.payload.position;
        sw.enabled = action.payload.enabled;
      }
    }
  };
