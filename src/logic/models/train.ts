import { Data, Id } from '@logic/models/base';

export interface Train extends Data {
  id: Id;
  segmentId: Id | null;
  betweenNextSegmentId: Id | null;
  isExternal: boolean;
  speed: number;
  speedBeforeStop: number;
}
