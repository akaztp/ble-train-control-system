import { Data, Id, Pos } from '../base';
import { PlacedPrimitive } from './placed-primitive';

export interface LayoutDescriptor extends Data {
  id: Id;
  canvas: Pos;
  primitives: PlacedPrimitive[];
}
