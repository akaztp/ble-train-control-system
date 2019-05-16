import { Train } from '@logic/models/train';
import { DeviceState } from '../device-state';
import { Observer, Subscriber, Unsubscriber } from '../observer';

export const trainsListSelector$ =
    (stateObserver$: Observer<DeviceState>) =>
        (subscriber: Subscriber<Train[]>): Unsubscriber =>
            stateObserver$.subscribe((state) => subscriber(Object.values(state.trains)));
