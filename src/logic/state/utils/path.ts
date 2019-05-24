import { SimpleMap } from '@logic/models/base';
import { PathToSegment } from '@logic/models/segment';
import { Switch } from '@logic/models/switch';

export function isPathOpen(
    path: PathToSegment,
    switches: SimpleMap<Switch>,
): boolean {
    return path.switchesStates.reduce(
        (opened: boolean, switchState) => opened && switches[switchState.id].pos === switchState.pos,
        true,
    );
}
