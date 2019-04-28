import { State } from '@logic/models/state';
import {
  ActionPayloadSwitch,
  ActionType,
  LocalAction,
} from '@logic/state/action';
import { Reducer } from '@logic/state/store';

export const switchReducer: Reducer<State, LocalAction<ActionPayloadSwitch>> =
  (state, action): void => {
    switch (action.type) {
      case ActionType.Switch: {
        const sw = state.switches[action.payload.switchId];
        sw.position = action.payload.position;
        sw.enabled = action.payload.enabled;
      }
    }
  };
