import { applyPaths } from '@layout/segment-path-switches';
import { SimpleMap } from '@logic/models/base';
import { resolveSegmentsRefs, Segment } from '@logic/models/segment';
import { segment0 } from './segments/segment0';
import { segment1 } from './segments/segment1';
import { segment2 } from './segments/segment2';
import { segment3 } from './segments/segment3';
import { segment4 } from './segments/segment4';
import { segment5 } from './segments/segment5';
import { segment6 } from './segments/segment6';
import { segment7 } from './segments/segment7';
import { segment8 } from './segments/segment8';
import { segment9 } from './segments/segment9';

const allSegments: SimpleMap<Segment> = resolveSegmentsRefs({
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

export const segments = resolvePaths(allSegments);

function resolvePaths(segments: SimpleMap<Segment>): SimpleMap<Segment> {
  Object.keys(allSegments).forEach(
    (id) => applyPaths(allSegments[id as any], allSegments),
  );
  return segments;
}
