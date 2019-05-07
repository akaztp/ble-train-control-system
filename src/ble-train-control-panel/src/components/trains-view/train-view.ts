import { Train } from '@logic/models/train';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class TrainView extends Vue {
    @Prop() train!: Train;

    @Emit() revClick(): void {}

    @Emit() fwClick(): void {}

    @Emit() stopClick(): void {}

    @Emit() invertClick(): void {}

    invertDirDisabled(): boolean {
        if (this.train) {
            return this.train.speed !== 0 ||
                this.train.stoppedAtSignalLight !== null ||
                this.train.enteringSegment !== null;
        }
        return true;
    }
}
