import { segment0, signalLights0 } from '@layout/segments/segment0';
import { addPos, Pos } from '@logic/models/base';
import { PlacedPrimitive, trainFrontRight } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Rotation } from '@logic/models/layout-descriptor/rotation';
import { addSegment } from '../../utils/add-segment';

const h1 = 5;
const h2 = 13;
const w = 28;
export const p1: Pos = {x: 1, y: h1};
export const p2: Pos = addPos(p1, {x: w - 3, y: h2 - h1});
export const primitives0: PlacedPrimitive[] = addSegment(
    segment0[0],
    p1,
    [
        {
            fromPos: {x: 0, y: 0}, toPos: {x: 0, y: 2 - h1}, rotation: Rotation.R270,
            primitive: Primitive.Straight,
        }, {
        fromPos: {x: 0, y: -1}, rotation: Rotation.R90,
        primitive: Primitive.SignalLight,
        data: signalLights0[0],
    }, {
        fromPos: {x: 0, y: 1 - h1}, rotation: Rotation.R180,
        primitive: Primitive.Corner,
    }, {
        fromPos: {x: 1, y: 1 - h1}, toPos: {x: w - 2, y: 1 - h1}, rotation: Rotation.R0,
        primitive: Primitive.Straight,
    }, {
        fromPos: {x: Math.round((w - 1) / 2), y: 1 - h1}, rotation: Rotation.R0,
        primitive: Primitive.TrainPresence,
        data: trainFrontRight,
    }, {
        fromPos: {x: w - 1, y: 1 - h1}, rotation: Rotation.R270,
        primitive: Primitive.Corner,
    }, {
        fromPos: {x: w - 1, y: 2 - h1}, toPos: {x: w - 1, y: h2 - h1 - 1}, rotation: Rotation.R90,
        primitive: Primitive.Straight,
    }, {
        fromPos: {x: w - 1, y: h2 - h1}, rotation: Rotation.R0,
        primitive: Primitive.Corner,
    }, {
        fromPos: {x: w - 2, y: h2 - h1},
        toPos: addPos(p2, {x: -p1.x, y: -p1.y}),
        rotation: Rotation.R0,
        primitive: Primitive.Straight,
    }, {
        fromPos: {x: w - 2, y: h2 - h1}, rotation: Rotation.R180,
        primitive: Primitive.SignalLight,
        data: signalLights0[1],
    },
    ],
);
