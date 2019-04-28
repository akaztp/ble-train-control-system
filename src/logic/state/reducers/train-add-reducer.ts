import { State } from '@logic/models/state';
import {
  ActionPayloadTrainAdd,
  ActionType,
  LocalAction,
} from '@logic/state/action';
import { Reducer } from '@logic/state/store';

export const trainAddReducer: Reducer<State, LocalAction<ActionPayloadTrainAdd>> =
  (state, action): void => {
    switch (action.type) {
      case ActionType.TrainPosition: {
        const uniqueId = 0;
        state.trains[uniqueId] = {
          id: uniqueId,
          name: action.payload.name,
          segment: state.segments[action.payload.segmentId],
          enteringSegment: null,
          speed: 0,
          speedBeforeStop: 0,
          isUncontrolled: action.payload.isUncontrolled,
        };
      }
    }
  };
