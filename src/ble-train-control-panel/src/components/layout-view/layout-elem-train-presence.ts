import { Data } from '@logic/models/base';
import { trainFrontRight } from '@logic/models/layout-descriptor/placed-primitive';
import { Segment } from '@logic/models/segment';
import { Train } from '@logic/models/train';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class LayoutElemTrainPresence extends Vue {
    @Prop() train!: Train | null;
    @Prop() segment!: Segment;
    @Prop() data!: Data;

    @Emit() click(): void {}

    trainToRight(): boolean {
        if (this.train) {
            if (this.data) {
                return this.data.id === trainFrontRight.id ? !this.train.invertedDir : this.train.invertedDir;
            } else {
                console.error('TrainPresence primitive data field not configured for segment id ' + this.segment.id);
            }
        }
        return true;
    }
}
