import { p2 as seg1P2 } from '@layout/segments/primitives1';
import { segment7, signalLights7 } from '@layout/segments/segment7';
import { addPos, Pos } from '@logic/models/base';
import { PlacedPrimitive, trainFrontLeft } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../../utils/add-segment';

const p1: Pos = addPos(seg1P2, {x: 2, y: -2});
export const primitives7: PlacedPrimitive[] = addSegment(
    segment7[7],
    p1,
    [
        {
            fromPos: {x: 0, y: 0}, toPos: {x: 7, y: 0},
            rotation: Rotation.R0,
            primitive: Primitive.Straight,
        }, {
        fromPos: {x: 4, y: 0},
        rotation: Rotation.R0,
        primitive: Primitive.TrainPresence,
        data: trainFrontLeft,
    }, {
        fromPos: {x: 1, y: 0}, rotation: Rotation.R180,
        primitive: Primitive.SignalLight,
        data: signalLights7[70],
    },
    ],
);
