import { Id, SimpleMap } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { State } from '@logic/models/state';
import { Train } from '@logic/models/train';
import { ActionPayloadTrainPosition, ActionType, LocalAction } from '@logic/state/action';
import { Reducer } from '@logic/state/store';
import { segmentPaths } from '@logic/state/utils/segment';
import { findTrainFromToSegments } from '@logic/state/utils/train';

export const switchAvailabilityReducer: Reducer<State, LocalAction<ActionPayloadTrainPosition>> =
    (state, action): void => {
        if (action.type === ActionType.TrainPosition) {
            const {segmentId} = action.payload;
            const segment = state.segments[segmentId];
            const switchesToChange: { [key: string]: boolean } = {};
            if (segment.fromSignalLight) {
                checkPaths(segment, segment.fromSignalLight.id, switchesToChange, state.trains);
            }
            if (segment.toSignalLight) {
                checkPaths(segment, segment.toSignalLight.id, switchesToChange, state.trains);
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
        let train = findTrainFromToSegments(segment.id, path.segmentId, trains);
        if (!train) {
            train = findTrainFromToSegments(path.segmentId, segment.id, trains);
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
