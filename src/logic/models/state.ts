import { Id, SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { Switch } from '@logic/models/switch';
import { Train } from '@logic/models/train';

export interface State {
  segments: SimpleMap<Segment>;
  trains: SimpleMap<Train>;
  switches: SimpleMap<Switch>;
  currentDeviceId: string;
  layoutId: Id;
}
