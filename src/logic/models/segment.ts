import { Data, Id, SimpleMap } from './base';
import { SignalLight } from './signal-light';
import { Switch, SwitchPosition } from './switch';

export interface SwitchState {
  id: Id;
  position: SwitchPosition;
}

export interface PathToSegment {
  segmentId: Id;
  segment?: Segment;
  signalLightId: Id;
  switchesStates: SwitchState[];
}

export interface Segment extends Data {
  id: Id;
  fromPaths: PathToSegment[];
  fromSignalLight: SignalLight;
  toPaths: PathToSegment[];
  toSignalLight: SignalLight | null;
}

export function resolveSegmentsRefs(segments: SimpleMap<Segment>): SimpleMap<Segment> {
  Object.keys(segments).forEach((key) => {
    const segment = segments[key as any];
    segment.fromPaths.forEach(resolveSegmentRefs);
    segment.toPaths.forEach(resolveSegmentRefs);
  });
  return segments;

  function resolveSegmentRefs(path: PathToSegment): void {
    path.segment = segments[path.segmentId];
  }
}
