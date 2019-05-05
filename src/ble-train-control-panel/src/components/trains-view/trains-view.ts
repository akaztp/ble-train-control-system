import { Id } from '@logic/models/base';
import { Train } from '@logic/models/train';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { Unsubscriber } from '../../store/observer';
import { StoreInterface, storeInterfaceInjectorKey } from '../../store/store-interface';
import TrainView from './train-view.vue';

@Component({
    components: {
        TrainView,
    },
})
export default class TrainsView extends Vue {
    @Inject(storeInterfaceInjectorKey) readonly storeInterface!: StoreInterface;
    trainsList: Train[] = [];
    trainsList$$: Unsubscriber | null = null;

    changeSpeed(trainId: Id, speed: number): void {
        this.storeInterface.changeTrainSpeed(trainId, speed);
    }

    created() {
        this.trainsList$$ =
            this.storeInterface.trainsList$((trains: Train[]) => {
                this.trainsList = trains;
            });
    }

    destroyed() {
        if (this.trainsList$$) {
            this.trainsList$$();
        }
    }
}
