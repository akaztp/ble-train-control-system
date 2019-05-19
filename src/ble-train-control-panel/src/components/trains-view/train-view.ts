import { Train } from '@logic/models/train';
import { isSimulated } from '@logic/state/utils/train';
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

    @Emit() connectClick(): void {}

    @Emit() disconnectClick(): void {}


    isSetupPossible(): boolean {
        if (this.train) {
            return this.train.speed === 0 &&
                this.train.stoppedAtSignalLight === null &&
                this.train.enteringSegment === null;
        }
        return false;
    }

    isSimulated(): boolean {
        return this.train ? isSimulated(this.train) : true;
    }
}
