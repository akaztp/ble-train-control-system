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
    trains: {},
  };
}
