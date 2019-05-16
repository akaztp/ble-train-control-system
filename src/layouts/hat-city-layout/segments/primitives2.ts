import { p2 as seg0P2 } from '@layout/segments/primitives0';
import { p2 as seg3P2 } from '@layout/segments/primitives3';
import { segment2, signalLights2 } from '@layout/segments/segment2';
import { addPos, Pos } from '@logic/models/base';
import { PlacedPrimitive, trainFrontLeft } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../../utils/add-segment';

const p1: Pos = addPos(seg0P2, {x: -2, y: 0});
const p2: Pos = {x: seg3P2.x + 2, y: seg0P2.y};
export const primitives2: PlacedPrimitive[] = addSegment(
    segment2[2],
    p1,
    [
        {
            fromPos: {x: 0, y: 0},
            toPos: addPos(p2, {x: -p1.x, y: -p1.y}),
            rotation: Rotation.R0,
            primitive: Primitive.Straight,
        }, {
        fromPos: addPos({x: Math.round(p1.x + p2.x) / 2, y: p2.y}, {x: -p1.x, y: -p1.y}),
        rotation: Rotation.R0,
        primitive: Primitive.TrainPresence,
        data: trainFrontLeft,
    }, {
        fromPos: {x: -1, y: 0}, rotation: Rotation.R0,
        primitive: Primitive.SignalLight,
        data: signalLights2[20],
    }, {
        fromPos: addPos(p2, {x: -p1.x + 1, y: -p1.y}), rotation: Rotation.R180,
        primitive: Primitive.SignalLight,
        data: signalLights2[21],
    },
    ],
);
