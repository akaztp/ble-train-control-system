import { Data, Id } from '@logic/models/base';
import { Segment } from '@logic/models/segment';

export interface Train extends Data {
    id: Id;
    name: string;
    segment: Segment;
    enteringSegment: Segment | null;
    speed: number;
    speedBeforeStop: number;
    driverDevice: string | null; // null: simulated train
    stoppedAtSignalLight: Id | null;
}
