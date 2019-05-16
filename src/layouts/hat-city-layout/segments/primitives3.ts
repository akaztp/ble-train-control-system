import { p1 as seg0P1, p2 as seg0P2 } from '@layout/segments/primitives0';
import { segment3, signalLights3 } from '@layout/segments/segment3';
import { addPos, Pos } from '@logic/models/base';
import { PlacedPrimitive, trainFrontRight } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../../utils/add-segment';

const p1: Pos = addPos(seg0P1, {x: 0, y: 2});
export const p2: Pos = {x: seg0P1.x + 7, y: seg0P2.y};
export const primitives3: PlacedPrimitive[] = addSegment(
    segment3[3],
    p1,
    [
        {
            fromPos: {x: 0, y: 0},
            toPos: {x: 0, y: p2.y - p1.y - 1},
            rotation: Rotation.R90,
            primitive: Primitive.Straight,
        }, {
        fromPos: {x: 0, y: 0}, rotation: Rotation.R270,
        primitive: Primitive.SignalLight,
        data: signalLights3[30],
    }, {
        fromPos: {x: 0, y: Math.round((p2.y - p1.y) / 2) + 1},
        rotation: Rotation.R270,
        primitive: Primitive.TrainPresence,
        data: trainFrontRight,
    }, {
        fromPos: {x: 0, y: p2.y - p1.y},
        rotation: Rotation.R90,
        primitive: Primitive.Corner,
    }, {
        fromPos: {x: 1, y: p2.y - p1.y},
        toPos: {x: p2.x - p1.x, y: p2.y - p1.y},
        rotation: Rotation.R0,
        primitive: Primitive.Straight,
    }, {
        fromPos: addPos(p2, {x: -p1.x - 1, y: -p1.y}),
        rotation: Rotation.R0,
        primitive: Primitive.SignalLight,
        data: signalLights3[31],
    },
    ],
);
