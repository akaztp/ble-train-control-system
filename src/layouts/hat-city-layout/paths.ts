import { Id, SimpleMap } from '@logic/models/base';
import { PathToSegment, Segment, SwitchState } from '@logic/models/segment';
import { SwitchPosition } from '@logic/models/switch';

const allPaths: PathBetweenSegments[] = [
    {
        segmentAId: 0, signalLightAId: 0,
        segmentBId: 3, signalLightBId: 30,
        switchesStates: [{id: 0, pos: SwitchPosition.Straight}],
    },
    {
        segmentAId: 0, signalLightAId: 1,
        segmentBId: 2, signalLightBId: 20,
        switchesStates: [{id: 7, pos: SwitchPosition.Straight}],
    },
    {
        segmentAId: 0, signalLightAId: 1,
        segmentBId: 1, signalLightBId: 10,
        switchesStates: [{id: 7, pos: SwitchPosition.Turnout}],
    },
    {
        segmentAId: 1, signalLightAId: 11,
        segmentBId: 3, signalLightBId: 31,
        switchesStates: [
            {id: 5, pos: SwitchPosition.Straight},
            {id: 6, pos: SwitchPosition.Turnout},
        ],
    },
    {
        segmentAId: 2, signalLightAId: 21,
        segmentBId: 3, signalLightBId: 31,
        switchesStates: [{id: 6, pos: SwitchPosition.Straight}],
    },
    {
        segmentAId: 4, signalLightAId: 40,
        segmentBId: 3, signalLightBId: 30,
        switchesStates: [
            {id: 0, pos: SwitchPosition.Turnout},
            {id: 1, pos: SwitchPosition.Straight},
        ],
    },
    {
        segmentAId: 5, signalLightAId: 50,
        segmentBId: 3, signalLightBId: 30,
        switchesStates: [
            {id: 0, pos: SwitchPosition.Turnout},
            {id: 1, pos: SwitchPosition.Turnout},
            {id: 2, pos: SwitchPosition.Straight},
        ],
    },
    {
        segmentAId: 6, signalLightAId: 60,
        segmentBId: 3, signalLightBId: 30,
        switchesStates: [
            {id: 0, pos: SwitchPosition.Turnout},
            {id: 1, pos: SwitchPosition.Turnout},
            {id: 2, pos: SwitchPosition.Turnout},
            {id: 3, pos: SwitchPosition.Straight},
        ],
    },
    {
        segmentAId: 7, signalLightAId: 70,
        segmentBId: 3, signalLightBId: 31,
        switchesStates: [
            {id: 5, pos: SwitchPosition.Turnout},
            {id: 6, pos: SwitchPosition.Turnout},
        ],
    },
    {
        segmentAId: 8, signalLightAId: 80,
        segmentBId: 6, signalLightBId: 60,
        switchesStates: [
            {id: 4, pos: SwitchPosition.Turnout},
            {id: 3, pos: SwitchPosition.Turnout},
        ],
    },
    {
        segmentAId: 9, signalLightAId: 90,
        segmentBId: 6, signalLightBId: 60,
        switchesStates: [
            {id: 4, pos: SwitchPosition.Straight},
            {id: 3, pos: SwitchPosition.Turnout},
        ],
    },
];

interface PathBetweenSegments {
    segmentAId: Id;
    signalLightAId: Id;
    signalLightBId: Id;
    segmentBId: Id;
    switchesStates: SwitchState[];
}

export function applyPaths(
    segment: Segment,
    allSegments: SimpleMap<Segment>,
): Segment {
    allPaths.forEach(
        (path) => {
            let foundSegmentSignalLightId: Id | null = null;
            let otherEndSegmentId: Id | null = null;
            let otherEndSignalLightId: Id | null = null;
            switch (segment.id) {
                case path.segmentAId:
                    foundSegmentSignalLightId = path.signalLightAId;
                    otherEndSegmentId = path.segmentBId;
                    otherEndSignalLightId = path.signalLightBId;
                    break;
                case path.segmentBId:
                    foundSegmentSignalLightId = path.signalLightBId;
                    otherEndSegmentId = path.segmentAId;
                    otherEndSignalLightId = path.signalLightAId;
                    break;
            }

            if (foundSegmentSignalLightId !== null) {
                const pathToOtherSegment: PathToSegment = {
                    segId: otherEndSegmentId!,
                    segment: allSegments[otherEndSegmentId!],
                    switchesStates: path.switchesStates,
                    signalLightId: otherEndSignalLightId!,
                };
                if (segment.frSignal !== null && foundSegmentSignalLightId === segment.frSignal.id) {
                    segment.frPaths.push(pathToOtherSegment);
                } else if (segment.toSignal !== null && foundSegmentSignalLightId === segment.toSignal.id) {
                    segment.toPaths.push(pathToOtherSegment);
                } else {
                    console.error(`Non existing SignalLight id ${foundSegmentSignalLightId} in segment id ${segment.id} referenced by PathBetweenSegments.`);
                }
            }
        });
    return segment;
}
