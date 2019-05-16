import { segment8, signalLights } from '@layout/segments/segment8';
import { Pos } from '@logic/models/base';
import { PlacedPrimitive, trainFrontRight } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../../utils/add-segment';

export const p1: Pos = {x: 6, y: 7};
export const primitives8: PlacedPrimitive[] = addSegment(
    segment8[8],
    p1,
    [
        {
            fromPos: {x: 0, y: 0}, toPos: {x: -3, y: 0}, rotation: Rotation.R0,
            primitive: Primitive.Straight,
        }, {
        fromPos: {x: -2, y: 0}, rotation: Rotation.R0,
        primitive: Primitive.TrainPresence,
        data: trainFrontRight,
    }, {
        fromPos: {x: 0, y: 0}, rotation: Rotation.R0,
        primitive: Primitive.SignalLight,
        data: signalLights[80],
    },
    ],
);
