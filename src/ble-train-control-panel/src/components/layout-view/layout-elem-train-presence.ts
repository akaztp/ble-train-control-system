import { Data } from '@logic/models/base';
import { Segment } from '@logic/models/segment';
import { Train } from '@logic/models/train';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class LayoutElemTrainPresence extends Vue {
    @Prop() train!: Train | null;
    @Prop() segment!: Segment;
    @Prop() data!: Data;

    @Emit() click(): void {}
}
