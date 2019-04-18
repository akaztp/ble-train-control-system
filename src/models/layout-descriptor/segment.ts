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
  Object.values(segments).forEach((segment: Segment) => segment.paths.forEach(resolveSegmentRefs));
  return segments;

  function resolveSegmentRefs(path: Path): void {
    path.fromSegment = segments[path.fromSegmentId];
    path.toSegment = segments[path.toSegmentId];
  }
}
