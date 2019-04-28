import { State } from '@logic/models/state';
import {
  ActionPayloadTrainPosition,
  ActionType,
  LocalAction,
} from '@logic/state/action';
import { Reducer } from '@logic/state/store';

export const trainPositionReducer: Reducer<State, LocalAction<ActionPayloadTrainPosition>> =
  (state, action): void => {
    switch (action.type) {
      case ActionType.TrainPosition: {
        const train = state.trains[action.payload.trainId];
        if (train) {
          train.segment = state.segments[action.payload.segmentId];
          train.enteringSegment = action.payload.enteringSegmentId ?
            state.segments[action.payload.enteringSegmentId] :
            null;
        }
      }
    }
  };
