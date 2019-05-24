import { Id, SimpleMap } from '@logic/models/base';
import { Train } from '@logic/models/train';

export function findTrainTouchingSegment(trains: SimpleMap<Train>, segmentId: Id): Train | null {
    return findTrain(
        trains,
        (t: Train) =>
            t.seg.id === segmentId ||
            (t.enterSeg !== null && t.enterSeg.id === segmentId),
    );
}

export function findTrainInsideSegment(trains: SimpleMap<Train>, segmentId: Id): Train | null {
    return findTrain(
        trains,
        (t: Train) =>
            t.seg.id === segmentId && (t.enterSeg === null),
    );
}

export function findTrainEnteringSegment(trains: SimpleMap<Train>, segmentId: Id): Train | null {
    return findTrain(
        trains,
        (t: Train) =>
            (t.enterSeg !== null && t.enterSeg.id === segmentId),
    );
}

export function findTrainFromToSegments(
    fromSegmentId: Id,
    toSegmentId: Id,
    trains: SimpleMap<Train>,
): Train | null {
    return findTrain(
        trains,
        (t: Train) => (t.seg.id === fromSegmentId &&
            (t.enterSeg !== null && t.enterSeg.id === toSegmentId)),
    );
}

function findTrain(
    trains: SimpleMap<Train>,
    predicate: (t: Train) => boolean,
): Train | null {
    return Object.keys(trains)
        .map((id) => trains[id as any])
        .find(predicate) || null;
}

export function isSimulated(train: Train): boolean {
    return train.driverDeviceId === null;
}
