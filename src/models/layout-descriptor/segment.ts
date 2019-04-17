import { Data, Id, SimpleMap } from '../base';
import { SignalLight } from './signal-light';
import { Switch } from './switch';

export interface Path {
  fromSegmentId: Id;
  fromSegment: Segment;
  fromSignal: SignalLight;
  toSegmentId: Id;
  toSegment: Segment;
  switches: Switch[];
}

export interface Segment extends Data {
  id: Id;
  paths: Path[];
}

export function resolveSegmentsRefs(segments: SimpleMap<Segment>): SimpleMap<Segment> {
  Object.keys(segments).forEach(resolveSegmentRefs);
  return segments;

  function resolveSegmentRefs(segment): void {
    segment.fromSegment = segments[segment.fromSegmentId];
    segment.toSegment = segments[segment.toSegmentId];
  }
}
