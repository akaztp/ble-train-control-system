import { Observer, Subscriber, Unsubscriber } from '@/store/observer';
import { State } from '@logic/models/state';
import { Train } from '@logic/models/train';

export const trainsListSelector$ =
  (stateObserver$: Observer<State>) =>
    (subscriber: Subscriber<Train[]>): Unsubscriber =>
      stateObserver$.subscribe((state) => subscriber(Object.values(state.trains)));
