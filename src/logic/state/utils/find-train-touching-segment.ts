import { Id, SimpleMap } from '@logic/models/base';
import { Train } from '@logic/models/train';

export function findTrainTouchingSegment(trains: SimpleMap<Train>, segmentId: Id): Train | null {
  return Object.keys(trains)
    .map((id) => trains[id as any])
    .find(
    (t: Train) => {
      return t.segment.id === segmentId ||
      (!!t.enteringSegment && t.enteringSegment.id === segmentId);
    }
  ) || null;
}
