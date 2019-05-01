import { State } from '@logic/models/state';
import { ActionPayloadSignalLight, ActionType, LocalAction } from '@logic/state/action';
import { Reducer } from '@logic/state/store';

export const signalLightReducer: Reducer<State, LocalAction<ActionPayloadSignalLight>> =
  (state: State, action: LocalAction<ActionPayloadSignalLight>): void => {
    switch (action.type) {
      case ActionType.SignalLight:
        const segment = state.segments[action.payload.segmentId];
        if (segment) {
          let signalLight = segment.fromSignalLight.id === action.payload.signalId ? segment.fromSignalLight : null;
          if (!signalLight && segment.toSignalLight) {
            signalLight = segment.toSignalLight.id === action.payload.signalId ? segment.toSignalLight : null;
          }
          if (signalLight) {
            signalLight.state = action.payload.state;
          }
        }
    }
  };
