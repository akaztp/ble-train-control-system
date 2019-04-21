import { SimpleMap } from '@logic/models/base';
import { LayoutDescriptor } from '@logic/models/layout-descriptor/layout-descriptor';
import {
  resolveSegmentsRefs,
  Segment,
} from '@logic/models/layout-descriptor/segment';
import { segment0, primitives0 } from './segment0';
import { primitives1, segment1 } from './segment1';

export const segments: SimpleMap<Segment> = resolveSegmentsRefs({
  ...segment0,
  ...segment1,
});

export const trackLayout: LayoutDescriptor = {
  id: 1,
  canvas: {x: 57, y: 15},
  primitives: [
    ...primitives0,
    ...primitives1,
  ],
};