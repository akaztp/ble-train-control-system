import { Id, SimpleMap } from '@logic/models/base';
import { PathToSegment, Segment } from '@logic/models/segment';
import { SignalLight } from '@logic/models/signal-light';
import { Switch } from '@logic/models/switch';
import { isPathOpen } from '@logic/state/utils/path';

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

export function segmentSignalLight(
    segment: Segment,
    signalLightId: Id,
): SignalLight | null {
    let signalLight = (segment.fromSignalLight && segment.fromSignalLight.id === signalLightId) ?
        segment.fromSignalLight :
        null;

    if (!signalLight && segment.toSignalLight) {
        signalLight = segment.toSignalLight.id === signalLightId ? segment.toSignalLight : null;
    }
    return signalLight;
}

export function segmentDirection(
    segment: Segment,
    speed: number,
): SignalLight | null {
    if (speed > 0) {
        return segment.toSignalLight;
    } else if (speed < 0) {
        return segment.fromSignalLight;
    }
    return null;
}

export function findNextSegmentId(
    segment: Segment,
    signalId: Id,
    switches: SimpleMap<Switch>,
): Id | null {
    const paths = segmentPaths(segment, signalId);
    if (paths && paths.length > 0) {
        const openPath = paths.find((path) => isPathOpen(path, switches)) || null;
        if (openPath) {
            return openPath.segmentId;
        }
    }
    return null;
}
