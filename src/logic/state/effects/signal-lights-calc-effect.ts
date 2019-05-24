import { SimpleMap } from '@logic/models/base';
import { PathToSegment, Segment } from '@logic/models/segment';
import { SignalLight, SignalLightState } from '@logic/models/signal-light';
import { Switch } from '@logic/models/switch';
import { Train } from '@logic/models/train';
import { ActionType, BroadcastAction } from '@logic/state/action';
import { ActionPayloadSignalLight, createActionSignalLight } from '@logic/state/actions/signal-light';
import { State } from '@logic/state/state';
import { Effect, triggerEffectForAction } from '@logic/state/store';
import { isPathOpen } from '@logic/state/utils/path';
import { SignalLightsConfig } from '../../models/device-configs';

const effect: Effect<State<SignalLightsConfig<unknown>>, BroadcastAction<any>> =
    (
        _action: BroadcastAction<unknown>,
        state: State<SignalLightsConfig<unknown>>,
    ): Array<BroadcastAction<ActionPayloadSignalLight>> => {

        const occupation = segmentsOccupation(state.segments, state.trains);

        const outputActions: Array<BroadcastAction<ActionPayloadSignalLight>> = [];
        Object.keys(state.segments).forEach((id) => {
            const segment: Segment = state.segments[id as any];
            let newAction: BroadcastAction<ActionPayloadSignalLight> | null = null;
            if (segment.frSignal) {
                newAction = checkSignalLight(
                    segment,
                    segment.frSignal,
                    segment.frPaths,
                    state.switches,
                    occupation,
                    state.deviceConfig,
                );
                if (newAction) {
                    outputActions.push(newAction);
                }
            }

            if (segment.toSignal) {
                newAction = checkSignalLight(
                    segment,
                    segment.toSignal,
                    segment.toPaths,
                    state.switches,
                    occupation,
                    state.deviceConfig,
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
    deviceConfig: SignalLightsConfig<unknown> | null,
): BroadcastAction<ActionPayloadSignalLight> | null {
    let action = null;
    if (deviceConfig && deviceConfig.signalLights[signalLight.id] !== undefined) {
        const openPath = paths.find((path) => isPathOpen(path, switches));
        const newSignalLightState: SignalLightState =
            (openPath && !occupation[openPath.segId]) ?
                SignalLightState.Green :
                SignalLightState.Red;

        if (signalLight.state !== newSignalLightState) {
            action = createActionSignalLight({
                segId: segment.id,
                signalId: signalLight.id,
                state: newSignalLightState,
            });
        }
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
            occupation[t.seg.id] = true;
            if (t.enterSeg !== null) {
                occupation[t.enterSeg.id] = true;
            }
        });
    return occupation;
}

export const signalLightsCalcEffect: Effect<State<SignalLightsConfig<unknown>>, BroadcastAction<any>> =
    triggerEffectForAction<State<SignalLightsConfig<unknown>>, BroadcastAction<any>>(
        [ActionType.TrainPosition, ActionType.Switch],
        effect,
    );
