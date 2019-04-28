import { Id } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SwitchPosition } from '@logic/models/switch';
import { Train } from '@logic/models/train';

export interface StoreInterface {
  switchChanger: (
    switchId: Id,
    position: SwitchPosition,
    enabled: boolean,
  ) => void;
  findTrainTouchingSegment: (segment: Segment) => Train | null;
}

export const storeInterfaceInjectorKey = 'StoreInterface';
