import { LayoutDescriptor } from '@logic/models/layout-descriptor/layout-descriptor';
import { interSegment0 } from './inter-segment0';
import { interSegment1 } from './inter-segment1';
import { interSegment2 } from './inter-segment2';
import { interSegment3 } from './inter-segment3';
import { primitives0 } from './segment0';
import { primitives1 } from './segment1';
import { primitives2 } from './segment2';
import { primitives3 } from './segment3';
import { primitives4 } from './segment4';
import { primitives5 } from './segment5';
import { primitives6 } from './segment6';
import { primitives7 } from './segment7';
import { primitives8 } from './segment8';
import { primitives9 } from './segment9';

export const trackLayout: LayoutDescriptor = {
  id: 1,
  canvas: {x: 30, y: 15},
  primitives: [
    ...interSegment0,
    ...interSegment1,
    ...interSegment2,
    ...interSegment3,
    ...primitives0,
    ...primitives1,
    ...primitives2,
    ...primitives3,
    ...primitives4,
    ...primitives5,
    ...primitives6,
    ...primitives7,
    ...primitives8,
    ...primitives9,
  ],
};
