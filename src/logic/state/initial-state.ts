import { SimpleMap } from '@logic/models/base';
import { resolveSegmentsRefs, Segment } from '@logic/models/segment';
import { State } from '@logic/models/state';
import { segment0 } from '../../layouts/hat-city-layout/segment0';
import { segment1 } from '../../layouts/hat-city-layout/segment1';
import { segment2 } from '../../layouts/hat-city-layout/segment2';
import { segment3 } from '../../layouts/hat-city-layout/segment3';
import { segment4 } from '../../layouts/hat-city-layout/segment4';
import { segment5 } from '../../layouts/hat-city-layout/segment5';
import { segment6 } from '../../layouts/hat-city-layout/segment6';
import { segment7 } from '../../layouts/hat-city-layout/segment7';
import { segment8 } from '../../layouts/hat-city-layout/segment8';
import { segment9 } from '../../layouts/hat-city-layout/segment9';
import { switches } from '../../layouts/hat-city-layout/switches';

const segments: SimpleMap<Segment> = resolveSegmentsRefs({
  ...segment0,
  ...segment1,
  ...segment2,
  ...segment3,
  ...segment4,
  ...segment5,
  ...segment6,
  ...segment7,
  ...segment8,
  ...segment9,
});

export const initialState: State = {
  layoutId: 0,
  currentDeviceId: '????',
  segments,
  switches,
  trains: {},
};
