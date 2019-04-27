import { Id, SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight } from '@logic/models/signal-light';
import { Switch } from '@logic/models/switch';
import { Train } from '@logic/models/train';

export interface State {
  segments: SimpleMap<Segment>;
  trains: SimpleMap<Train>;
  signals: SimpleMap<SignalLight>;
  switches: SimpleMap<Switch>;
  currentDeviceId: string;
  layoutId: Id;
}
