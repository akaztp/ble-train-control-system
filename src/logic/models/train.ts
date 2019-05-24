import { Data, Id } from '@logic/models/base';
import { Segment } from '@logic/models/segment';

export interface Train extends Data {
    id: Id;
    name: string;
    seg: Segment;
    enterSeg: Segment | null;
    speed: number;
    speedBefStop: number;
    driverDeviceId: string | null;
    stopAtSignal: Id | null;
    invDir: boolean;
}
