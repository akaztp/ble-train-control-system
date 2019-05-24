import { Id, SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { Train } from '@logic/models/train';
import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadTrainPosition } from '@logic/state/actions/train-position';
import { Reducer } from '@logic/state/store';
import { segmentPaths } from '@logic/state/utils/segment';
import { findTrainFromToSegments } from '@logic/state/utils/train';
import { DeviceState } from '../device-state';

export const switchAvailabilityReducer: Reducer<DeviceState, BroadcastAction<ActionPayloadTrainPosition>> =
    (state, action): void => {
        if (action.type === ActionType.TrainPosition) {
            const {segId} = action.payload;
            const segment = state.segments[segId];
            const switchesToChange: { [key: string]: boolean } = {};
            if (segment.frSignal) {
                checkPaths(segment, segment.frSignal.id, switchesToChange, state.trains);
            }
            if (segment.toSignal) {
                checkPaths(segment, segment.toSignal.id, switchesToChange, state.trains);
            }
            Object.keys(switchesToChange).forEach(
                (key) => {
                    state.switches[key as any].enabled = switchesToChange[key];
                },
            );
        }
    };

function checkPaths(
    segment: Segment,
    signalLightId: Id,
    switchesToChange: { [p: string]: boolean },
    trains: SimpleMap<Train>,
): void {
    const paths = segmentPaths(segment, signalLightId);
    paths.forEach((path) => {
        let train = findTrainFromToSegments(segment.id, path.segId, trains);
        if (!train) {
            train = findTrainFromToSegments(path.segId, segment.id, trains);
        }
        path.switchesStates.forEach((sws) => {
            if (train) {
                switchesToChange[sws.id] = false;
            } else {
                if (switchesToChange[sws.id] === undefined) {
                    switchesToChange[sws.id] = true;
                }
            }
        });
    });
}
