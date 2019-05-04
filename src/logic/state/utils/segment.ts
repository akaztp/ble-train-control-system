import { Id } from '@logic/models/base';
import { PathToSegment, Segment } from '@logic/models/segment';
import { SignalLight } from '@logic/models/signal-light';

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
