import { Id, SimpleMap } from '@logic/models/base';
import { PathToSegment, Segment } from '@logic/models/segment';
import { SignalLight } from '@logic/models/signal-light';
import { Switch } from '@logic/models/switch';
import { isPathOpen } from '@logic/state/utils/path';

export function segmentPaths(
    segment: Segment,
    signalLightId: Id,
): PathToSegment[] {
    if (segment.frSignal && segment.frSignal.id === signalLightId) {
        return segment.frPaths;
    }
    if (segment.toSignal && segment.toSignal.id === signalLightId) {
        return segment.toPaths;
    }
    console.error(`SignalLight id ${signalLightId} specified does not exist on segment id ${segment.id}`);
    return [];
}

export function segmentSignalLight(
    segment: Segment,
    signalLightId: Id,
): SignalLight | null {
    let signalLight = (segment.frSignal && segment.frSignal.id === signalLightId) ?
        segment.frSignal :
        null;

    if (!signalLight && segment.toSignal) {
        signalLight = segment.toSignal.id === signalLightId ? segment.toSignal : null;
    }
    return signalLight;
}

export function segmentDirection(
    segment: Segment,
    speed: number,
    invertedDir: boolean,
): SignalLight | null {
    const adjustedSpeed = invertedDir ? -speed : speed;
    if (adjustedSpeed > 0) {
        return segment.toSignal;
    } else if (adjustedSpeed < 0) {
        return segment.frSignal;
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
            return openPath.segId;
        }
    }
    return null;
}
