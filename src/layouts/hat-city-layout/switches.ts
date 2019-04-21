import { SimpleMap } from '@logic/models/base';
import { Switch, SwitchPosition } from '@logic/models/layout-descriptor/switch';

export const switches: SimpleMap<Switch> = {
  0: {
    id: 0,
    position: SwitchPosition.Straight,
  } as Switch,
  1: {
    id: 1,
    position: SwitchPosition.Straight,
  } as Switch,
  7: {
    id: 7,
    position: SwitchPosition.Turnout,
  } as Switch,
};
