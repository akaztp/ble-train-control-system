import { Id } from '@logic/models/base';
import { State } from '@logic/models/state';
import { Train } from '@logic/models/train';

export function findTrainTouchingSegment(state: State, segmentId: Id): Train | null {
  return Object.values(state.trains).find(
    (t: Train) =>
      t.segment.id === segmentId ||
      (!!t.enteringSegment && t.enteringSegment.id === segmentId),
  ) || null;
}
