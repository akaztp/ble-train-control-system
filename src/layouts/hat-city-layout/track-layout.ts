import { primitives0 } from '@layout/segments/primitives0';
import { primitives1 } from '@layout/segments/primitives1';
import { primitives2 } from '@layout/segments/primitives2';
import { primitives3 } from '@layout/segments/primitives3';
import { primitives4 } from '@layout/segments/primitives4';
import { primitives5 } from '@layout/segments/primitives5';
import { primitives6 } from '@layout/segments/primitives6';
import { primitives7 } from '@layout/segments/primitives7';
import { primitives8 } from '@layout/segments/primitives8';
import { primitives9 } from '@layout/segments/primitives9';
import { LayoutDescriptor } from '@logic/models/layout-descriptor/layout-descriptor';
import { interSegment0 } from './inter-segments/inter-segment0';
import { interSegment1 } from './inter-segments/inter-segment1';
import { interSegment2 } from './inter-segments/inter-segment2';
import { interSegment3 } from './inter-segments/inter-segment3';
import { layoutId } from './layout-id';

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
