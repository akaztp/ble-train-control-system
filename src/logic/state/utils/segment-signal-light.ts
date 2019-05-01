import { Id } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { SignalLight } from '@logic/models/signal-light';

export function segmentSignalLight(segment: Segment, signalLightId: Id): SignalLight | null {
  let signalLight = segment.fromSignalLight.id === signalLightId ? segment.fromSignalLight : null;
  if (!signalLight && segment.toSignalLight) {
    signalLight = segment.toSignalLight.id === signalLightId ? segment.toSignalLight : null;
  }
  return signalLight;
}
