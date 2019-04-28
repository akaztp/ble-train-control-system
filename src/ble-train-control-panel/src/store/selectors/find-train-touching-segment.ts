import { Segment } from '@logic/models/segment';
import { State } from '@logic/models/state';
import { Train } from '@logic/models/train';

export const findTrainTouchingSegment =
  (state: State) =>
    (segment: Segment): Train => {
      return Object.values(state.trains).find(
        (t: Train) =>
          t.segment === segment || t.enteringSegment === segment,
      ) || null;
    };
