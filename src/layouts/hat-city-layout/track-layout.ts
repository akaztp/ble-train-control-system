import { LayoutDescriptor } from '@logic/models/layout-descriptor/layout-descriptor';
import { interSegment0 } from './inter-segments/inter-segment0';
import { interSegment1 } from './inter-segments/inter-segment1';
import { interSegment2 } from './inter-segments/inter-segment2';
import { interSegment3 } from './inter-segments/inter-segment3';
import { layoutId } from './layout-id';
import { primitives0 } from './segments/segment0';
import { primitives1 } from './segments/segment1';
import { primitives2 } from './segments/segment2';
import { primitives3 } from './segments/segment3';
import { primitives4 } from './segments/segment4';
import { primitives5 } from './segments/segment5';
import { primitives6 } from './segments/segment6';
import { primitives7 } from './segments/segment7';
import { primitives8 } from './segments/segment8';
import { primitives9 } from './segments/segment9';

export const trackLayout: LayoutDescriptor = {
  id: layoutId,
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
