import { SimpleMap } from '@logic/models/base';
import { Switch, SwitchPosition } from '@logic/models/switch';

export const switches: SimpleMap<Switch> = new Array(8).fill(null)
    .reduce<SimpleMap<Switch>>(
        (acc, val, idx) => ({
            ...acc,
            [idx]: {
                id: idx,
                pos: SwitchPosition.Straight,
                enabled: true,
            } as Switch,
        }),
        {},
    );
