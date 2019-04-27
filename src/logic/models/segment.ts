import { Data, Id, SimpleMap } from './base';
import { SignalLight } from './signal-light';
import { Switch } from './switch';

export interface Path {
  segmentId: Id;
  segment: Segment;
  signal: SignalLight;
  switchesStates: Switch[];
}

export interface Segment extends Data {
  id: Id;
  fromPaths: Path[];
  fromSignalLight: SignalLight;
  toPaths: Path[];
  toSignalLight: SignalLight | null;
}

export function resolveSegmentsRefs(segments: SimpleMap<Segment>): SimpleMap<Segment> {
  Object.keys(segments).forEach((key) => {
    const segment = segments[key as any];
    segment.fromPaths.forEach(resolveSegmentRefs);
    segment.toPaths.forEach(resolveSegmentRefs);
  });
  return segments;

  function resolveSegmentRefs(path: Path): void {
    path.segment = segments[path.segmentId];
  }
}