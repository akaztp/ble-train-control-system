import { initTrackMilestone, TrackMilestone } from './track-milestone';
import { Train } from './train';

export const milestones: TrackMilestone[] = [
    initTrackMilestone('1', '74:e1:82:02:28:42 public', -70),
];
export const trainControl: Train = {
    id: '01',
    speed: undefined,
    forwardPins: [D4, D5],
};
