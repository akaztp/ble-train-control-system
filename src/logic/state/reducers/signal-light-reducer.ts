import { State } from '@logic/models/state';
import { ActionType, LocalAction } from '@logic/state/action';
import { ActionPayloadSignalLight } from '@logic/state/actions/signal-light';
import { Reducer } from '@logic/state/store';
import { segmentSignalLight } from '@logic/state/utils/segment';

export const signalLightReducer: Reducer<State, LocalAction<ActionPayloadSignalLight>> =
  (state: State, action: LocalAction<ActionPayloadSignalLight>): void => {
    if (action.type === ActionType.SignalLight) {
      const segment = state.segments[action.payload.segmentId];
      if (segment) {
        const signalLight = segmentSignalLight(segment, action.payload.signalId);
        if (signalLight) {
          signalLight.state = action.payload.state;
        }
      }
    }
  };
