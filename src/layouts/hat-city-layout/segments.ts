import { SimpleMap } from '@logic/models/base';
import { resolveSegmentsRefs, Segment } from '@logic/models/segment';
import { segment0 } from './segment0';
import { segment1 } from './segment1';
import { segment2 } from './segment2';
import { segment3 } from './segment3';
import { segment4 } from './segment4';
import { segment5 } from './segment5';
import { segment6 } from './segment6';
import { segment7 } from './segment7';
import { segment8 } from './segment8';
import { segment9 } from './segment9';

export const segments: SimpleMap<Segment> = resolveSegmentsRefs({
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
