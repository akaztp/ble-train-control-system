import { findTrainTouchingSegment } from '@logic/state/utils/find-train-touching-segment';
import { State } from '@logic/models/state';
import {
  ActionPayloadTrainAdd,
  ActionType,
  createActionTrainPosition,
  createActionTrainSpeed,
} from '@logic/state/action';
import { Effect, StoreAction, triggerEffectForAction } from '@logic/state/store';

const effect: Effect<State> =
  (action: StoreAction<ActionPayloadTrainAdd>, state: State): Array<StoreAction<any>> => {
    const train = findTrainTouchingSegment(state.trains, action.payload.segmentId);
    if (train && train.id === action.payload.id) {
      return [
        createActionTrainPosition({
          trainId: train.id,
          segmentId: train.segment.id,
          enteringSegmentId: !!train.enteringSegment ? train.enteringSegment.id : null,
        }),
        createActionTrainSpeed({trainId: train.id, speed: 0}),
      ];
    } else {
      // TODO: emit an error notification about the train hasn't been added
      return [];
    }
  };

export const addTrainEffect: Effect<State> = triggerEffectForAction<State>(
  ActionType.TrainAdd,
  effect,
);
