import { segments } from '@layout/segments';
import { switches } from '@layout/switches';
import { State } from '@logic/models/state';

export function createInitialState(
  layoutId: number,
  currentDeviceId: string,
): State {
  return {
    layoutId,
    currentDeviceId,
    segments,
    switches,
    trains: {
      0 : {
        id: 0,
        name: 'TR01',
        segment: segments[0],
        enteringSegment: null,
        speed: 0,
        isUncontrolled: false,
        speedBeforeStop: 0,
      },
    },
  };
}
