import { State } from '@logic/models/state';
import {
  ActionPayloadTrainPosition,
  ActionType,
  LocalAction,
} from '@logic/state/action';
import { Reducer } from '@logic/state/store';

export const trainPositionReducer: Reducer<State, LocalAction<ActionPayloadTrainPosition>> =
  (state, action): void => {
    if (action.type === ActionType.TrainPosition) {
      {
        const train = state.trains[action.payload.trainId];
        if (train) {
          train.segment = state.segments[action.payload.segmentId];
          train.enteringSegment = action.payload.enteringSegmentId !== null ?
            state.segments[action.payload.enteringSegmentId] :
            null;
          if (action.payload.stoppedAtSignalLight !== undefined) {
            train.stoppedAtSignalLight = action.payload.stoppedAtSignalLight;
          }
        }
      }
    }
  };
