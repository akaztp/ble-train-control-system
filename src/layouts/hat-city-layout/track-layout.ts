import { SimpleMap } from '@logic/models/base';
import { LayoutDescriptor } from '@logic/models/layout-descriptor/layout-descriptor';
import {
  resolveSegmentsRefs,
  Segment,
} from '@logic/models/layout-descriptor/segment';
import { interSegment0 } from './inter-segment0';
import { primitives0, segment0 } from './segment0';
import { primitives1, segment1 } from './segment1';
import { primitives2, segment2 } from './segment2';
import { primitives4, segment4 } from './segment4';
import { primitives5, segment5 } from './segment5';
import { primitives6, segment6 } from './segment6';
import { primitives7, segment7 } from './segment7';
import { primitives8, segment8 } from './segment8';

export const segments: SimpleMap<Segment> = resolveSegmentsRefs({
  ...segment0,
  ...segment1,
  ...segment2,
  ...segment4,
  ...segment5,
  ...segment6,
  ...segment7,
  ...segment8,
});

export const trackLayout: LayoutDescriptor = {
  id: 1,
  canvas: {x: 30, y: 15},
  primitives: [
    ...interSegment0,
    ...primitives0,
    ...primitives1,
    ...primitives2,
    ...primitives4,
    ...primitives5,
    ...primitives6,
    ...primitives7,
    ...primitives8,
  ],
};
