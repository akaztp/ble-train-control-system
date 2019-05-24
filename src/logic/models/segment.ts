import { Data, Id, SimpleMap } from './base';
import { SignalLight } from './signal-light';
import { SwitchPosition } from './switch';

export interface SwitchState {
  id: Id;
    pos: SwitchPosition;
}

export interface PathToSegment {
    segId: Id;
  segment?: Segment;
  signalLightId: Id;
  switchesStates: SwitchState[];
}

export interface Segment extends Data {
  id: Id;
    frPaths: PathToSegment[];
    frSignal: SignalLight | null;
  toPaths: PathToSegment[];
    toSignal: SignalLight | null;
}

export function resolveSegmentsRefs(segments: SimpleMap<Segment>): SimpleMap<Segment> {
  Object.keys(segments).forEach((key) => {
    const segment = segments[key as any];
      segment.frPaths.forEach(resolveSegmentRefs);
    segment.toPaths.forEach(resolveSegmentRefs);
  });

  function resolveSegmentRefs(path: PathToSegment): void {
      path.segment = segments[path.segId];
  }

  return segments;
}
