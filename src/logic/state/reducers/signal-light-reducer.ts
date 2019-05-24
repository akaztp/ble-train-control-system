import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadSignalLight } from '@logic/state/actions/signal-light';
import { State } from '@logic/state/state';
import { Reducer } from '@logic/state/store';
import { segmentSignalLight } from '@logic/state/utils/segment';

export const signalLightReducer: Reducer<State, BroadcastAction<ActionPayloadSignalLight>> =
    (state: State, action: BroadcastAction<ActionPayloadSignalLight>): void => {
    if (action.type === ActionType.SignalLight) {
        const segment = state.segments[action.payload.segId];
      if (segment) {
        const signalLight = segmentSignalLight(segment, action.payload.signalId);
        if (signalLight) {
          signalLight.state = action.payload.state;
        }
      }
    }
  };
