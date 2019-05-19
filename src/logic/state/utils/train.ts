import { Id, SimpleMap } from '@logic/models/base';
import { Train } from '@logic/models/train';

export function findTrainTouchingSegment(trains: SimpleMap<Train>, segmentId: Id): Train | null {
    return findTrain(
        trains,
        (t: Train) =>
            t.segment.id === segmentId ||
            (t.enteringSegment !== null && t.enteringSegment.id === segmentId),
    );
}

export function findTrainInsideSegment(trains: SimpleMap<Train>, segmentId: Id): Train | null {
    return findTrain(
        trains,
        (t: Train) =>
            t.segment.id === segmentId && (t.enteringSegment === null),
    );
}

export function findTrainEnteringSegment(trains: SimpleMap<Train>, segmentId: Id): Train | null {
    return findTrain(
        trains,
        (t: Train) =>
            (t.enteringSegment !== null && t.enteringSegment.id === segmentId),
    );
}

export function findTrainFromToSegments(
    fromSegmentId: Id,
    toSegmentId: Id,
    trains: SimpleMap<Train>,
): Train | null {
    return findTrain(
        trains,
        (t: Train) => (t.segment.id === fromSegmentId &&
            (t.enteringSegment !== null && t.enteringSegment.id === toSegmentId)),
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
