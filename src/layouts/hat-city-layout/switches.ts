import { SimpleMap } from '@logic/models/base';
import { Switch, SwitchPosition } from '@logic/models/layout-descriptor/switch';

export const switches: SimpleMap<Switch> = new Array(8).fill(null)
.reduce(
  (acc, val, idx) => ({
    ...acc,
    [idx]: {
      id: idx,
      position: SwitchPosition.Turnout,
    } as Switch,
  }),
  {},
);
