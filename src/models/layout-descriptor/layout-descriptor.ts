import { Data, Id } from '../base';
import { PlacedPrimitive } from './placed-primitive';

export interface LayoutDescriptor extends Data {
  id: Id;
  primitives: PlacedPrimitive[];
}
