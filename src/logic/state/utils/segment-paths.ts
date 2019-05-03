import { Id } from '@logic/models/base';
import { PathToSegment, Segment } from '@logic/models/segment';

export function segmentPaths(
    segment: Segment,
    signalLightId: Id,
): PathToSegment[] {
    if (segment.fromSignalLight && segment.fromSignalLight.id === signalLightId) {
        return segment.fromPaths;
    }
    if (segment.toSignalLight && segment.toSignalLight.id === signalLightId) {
        return segment.toPaths;
    }
    console.error(`SignalLight id ${signalLightId} specified does not exist on segment id ${segment.id}`);
    return [];
}
