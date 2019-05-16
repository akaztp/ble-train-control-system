import { p2 as seg0P2 } from '@layout/segments/primitives0';
import { p2 as seg3P2 } from '@layout/segments/primitives3';
import { segment1, signalLights1 } from '@layout/segments/segment1';
import { addPos, Pos } from '@logic/models/base';
import { PlacedPrimitive, trainFrontLeft } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../../utils/add-segment';

const p1: Pos = {x: seg0P2.x - 4, y: seg0P2.y - 2};
export const p2: Pos = {x: seg3P2.x + 5, y: seg0P2.y - 2};
export const primitives1: PlacedPrimitive[] = addSegment(
    segment1[1],
    p1,
    [
        {
            fromPos: {x: 0, y: 0},
            toPos: addPos(p2, {x: -p1.x, y: -p1.y}),
            rotation: Rotation.R0,
            primitive: Primitive.Straight,
        }, {
        fromPos: addPos(
            {x: Math.round((p1.x + p2.x) / 2), y: p2.y},
            {x: -p1.x, y: -p1.y},
        ),
        rotation: Rotation.R0,
        primitive: Primitive.TrainPresence,
        data: trainFrontLeft,
    }, {
        fromPos: {x: -1, y: 0}, rotation: Rotation.R0,
        primitive: Primitive.SignalLight,
        data: signalLights1[10],
    }, {
        fromPos: addPos(p2, {x: -p1.x + 1, y: -p1.y}),

        rotation: Rotation.R180,
        primitive: Primitive.SignalLight,
        data: signalLights1[11],
    },
    ],
);
