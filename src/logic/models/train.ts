import { Data, Id } from '@logic/models/base';
import { Segment } from '@logic/models/segment';

export interface Train extends Data {
  id: Id;
  segment: Segment | null;
  enteringSegment: Segment | null;
  speed: number;
  speedBeforeStop: number;
  isUncontrolled: boolean;
}
