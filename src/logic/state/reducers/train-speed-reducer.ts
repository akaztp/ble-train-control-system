import { State } from '@logic/models/state';
import {
  ActionPayloadSwitch, ActionPayloadTrainSpeed,
  ActionType,
  LocalAction,
} from '@logic/state/action';
import { Reducer } from '@logic/state/store';

export const trainSpeedReducer: Reducer<State, LocalAction<ActionPayloadTrainSpeed>> =
  (state, action): void => {
    switch (action.type) {
      case ActionType.TrainSpeed: {
        const train = state.trains[action.payload.trainId];
        if (train) {
          train.speed = action.payload.speed;
        }
      }
    }
  };
