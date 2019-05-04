import { State } from '@logic/models/state';
import { ActionPayloadSignalLight, ActionType, LocalAction } from '@logic/state/action';
import { Reducer } from '@logic/state/store';
import { segmentSignalLight } from '@logic/state/utils/segment';

export const signalLightReducer: Reducer<State, LocalAction<ActionPayloadSignalLight>> =
  (state: State, action: LocalAction<ActionPayloadSignalLight>): void => {
    switch (action.type) {
      case ActionType.SignalLight:
        const segment = state.segments[action.payload.segmentId];
        if (segment) {
          const signalLight = segmentSignalLight(segment, action.payload.signalId);
          if (signalLight) {
            signalLight.state = action.payload.state;
          }
        }
    }
  };
