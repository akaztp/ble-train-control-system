import { applyPaths } from '@layout/paths';
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

const allSegments: SimpleMap<Segment> = {
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
};

let resolvedSegments: SimpleMap<Segment>;

function resolvePaths(unresolvedSegments: SimpleMap<Segment>): SimpleMap<Segment> {
  Object.keys(unresolvedSegments).forEach(
      (id) => applyPaths(unresolvedSegments[id as any], unresolvedSegments),
  );
  return unresolvedSegments;
}

export function segments(): SimpleMap<Segment> {
  if (!resolvedSegments) {
    resolvedSegments = resolvePaths(resolveSegmentsRefs(allSegments));
  }
  return resolvedSegments;
}
