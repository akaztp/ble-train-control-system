import { Pos } from '../base';
import { PlacedPrimitive } from './placed-primitive';

export interface LayoutDescriptor {
    id: string;
  canvas: Pos;
  primitives: PlacedPrimitive[];
}
