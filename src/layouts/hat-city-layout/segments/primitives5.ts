import { segment5, signalLights } from '@layout/segments/segment5';
import { Pos } from '@logic/models/base';
import { PlacedPrimitive, trainFrontRight } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../../utils/add-segment';

export const p1: Pos = {x: 10, y: 5};
export const primitives5: PlacedPrimitive[] = addSegment(
    segment5[5],
    p1,
    [
        {
            fromPos: {x: 0, y: 0}, toPos: {x: 12, y: 0}, rotation: Rotation.R0,
            primitive: Primitive.Straight,
        }, {
        fromPos: {x: 6, y: 0}, rotation: Rotation.R0,
        primitive: Primitive.TrainPresence,
        data: trainFrontRight,
    }, {
        fromPos: {x: 1, y: 0}, rotation: Rotation.R180,
        primitive: Primitive.SignalLight,
        data: signalLights[50],
    },
    ],
);
