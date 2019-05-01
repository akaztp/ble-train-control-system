import { Observer, Subscriber, Unsubscriber } from '@/store/observer';
import { findTrainTouchingSegment } from '@/store/utils/find-train-touching-segment';
import { Segment } from '@logic/models/segment';
import { State } from '@logic/models/state';
import { Train } from '@logic/models/train';

export const findTrainTouchingSegmentSelector$ =
  (stateObserver$: Observer<State>) =>
    (subscriber: Subscriber<Train | null>, segment: Segment): Unsubscriber =>
      stateObserver$.subscribe((state) => {
        return subscriber(findTrainTouchingSegment(state, segment.id));
      });
