import { SimpleMap } from '@logic/models/base';
import { PathToSegment, Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';
import { State } from '@logic/models/state';
import { Switch } from '@logic/models/switch';
import { Train } from '@logic/models/train';
import { ActionType, LocalAction } from '@logic/state/action';
import { ActionPayloadSignalLight, createActionSignalLight } from '@logic/state/actions/signal-light';
import { ActionPayloadSwitch } from '@logic/state/actions/switch';
import { Effect, StoreAction, triggerEffectForAction } from '@logic/state/store';
import { isPathOpen } from '@logic/state/utils/path';

const effect: Effect<State> =
    (
        action: StoreAction<ActionPayloadSignalLight | ActionPayloadSwitch>,
        state: State,
    ): Array<StoreAction<any>> => {

        const occupation = segmentsOccupation(state.segments, state.trains);

        const outputActions: Array<LocalAction<ActionPayloadSignalLight>> = [];
        Object.keys(state.segments).forEach((id) => {
            const segment: Segment = state.segments[id as any];
            let newAction: LocalAction<ActionPayloadSignalLight> | null = null;
            if (segment.fromSignalLight) {
                newAction = checkSignalLight(
                    segment,
                    segment.fromSignalLight,
                    segment.fromPaths,
                    state.switches,
                    occupation,
                );
                if (newAction) {
                    outputActions.push(newAction);
                }
            }

            if (segment.toSignalLight) {
                newAction = checkSignalLight(
                    segment,
                    segment.toSignalLight,
                    segment.toPaths,
                    state.switches,
                    occupation,
                );
                if (newAction) {
                    outputActions.push(newAction);
                }
            }
        });
        return outputActions;
    };

function checkSignalLight(
    segment: Segment,
    signalLight: SignalLight,
    paths: PathToSegment[],
    switches: SimpleMap<Switch>,
    occupation: { [key: number]: boolean },
): LocalAction<ActionPayloadSignalLight> | null {
    let action = null;
    // TODO: check if signalLight is owned by current device

    const openPath = paths.find((path) => isPathOpen(path, switches));
    const newSignalLightState: SignalLightState =
        (openPath && !occupation[openPath.segmentId]) ?
            SignalLightState.Green :
            SignalLightState.Red;

    if (signalLight.state !== newSignalLightState) {
        action = createActionSignalLight({
            segmentId: segment.id,
            signalId: signalLight.id,
            state: newSignalLightState,
        });
    }

    return action;
}

function segmentsOccupation(
    segments: SimpleMap<Segment>,
    trains: SimpleMap<Train>,
): { [key: number]: boolean } {
    const occupation = Object.keys(segments).reduce(
        (occ, id) => {
            occ[id as any] = false;
            return occ;
        },
        {} as { [key: number]: boolean },
    );
    Object.keys(trains)
        .forEach((id) => {
            const t = trains[id as any];
            occupation[t.segment.id] = true;
            if (t.enteringSegment !== null) {
                occupation[t.enteringSegment.id] = true;
            }
        });
    return occupation;
}

export const signalLightsCalcEffect: Effect<State> = triggerEffectForAction<State>(
    [ActionType.TrainPosition, ActionType.Switch],
    effect,
);
