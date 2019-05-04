import { Id, SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { Switch } from '@logic/models/switch';
import { isPathOpen } from '@logic/state/utils/is-path-open';
import { segmentPaths } from '@logic/state/utils/segment';

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
