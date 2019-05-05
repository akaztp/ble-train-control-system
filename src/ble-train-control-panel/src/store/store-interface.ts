import { Subscriber, Unsubscriber } from './observer';
import { Id } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SwitchPosition } from '@logic/models/switch';
import { Train } from '@logic/models/train';

export interface StoreInterface {
  addTrain: (
    name: string,
    segmentId: Id,
    isUncontrolled: boolean,
  ) => void;
  changeTrainSpeed: (
    trainId: Id,
    speed: number,
  ) => void;
  findTrainTouchingSegment$: (s: Subscriber<Train | null>, segment: Segment) => Unsubscriber;
  switchChanger: (
    switchId: Id,
    position: SwitchPosition,
    enabled: boolean,
  ) => void;
  trainsList$: (s: Subscriber<Train[]>) => Unsubscriber;
}

export const storeInterfaceInjectorKey = 'StoreInterface';
