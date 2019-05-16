import { Segment } from '@logic/models/segment';
import { Train } from '@logic/models/train';
import { findTrainTouchingSegment } from '@logic/state/utils/train';
import { DeviceState } from '../device-state';
import { Observer, Subscriber, Unsubscriber } from '../observer';

export const findTrainTouchingSegmentSelector$ =
    (stateObserver$: Observer<DeviceState>) =>
        (subscriber: Subscriber<Train | null>, segment: Segment): Unsubscriber =>
            stateObserver$.subscribe((state) => {
                return subscriber(findTrainTouchingSegment(state.trains, segment.id));
            });
