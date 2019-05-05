import LayoutView from '@/components/layout-view/layout-view.vue';
import TrainsView from '@/components/trains-view/trains-view.vue';
import { Segment } from '@logic/models/segment';
import { Train } from '@logic/models/train';
import { Component, Provide, Vue } from 'vue-property-decorator';
import { createStoreInterface } from './store/create-store-interface';
import { StoreInterface, storeInterfaceInjectorKey } from './store/store-interface';

@Component({
    components: {
        TrainsView,
        LayoutView,
    },
})
export default class App extends Vue {
    @Provide(storeInterfaceInjectorKey) storeInterface: StoreInterface = createStoreInterface();

    trainPresenceClick(
        segment: Segment,
        train: Train,
    ): void {
        if (!train) {
            this.addTrain(segment);
        }
    }

    addTrain(segment: Segment): void {
        this.storeInterface.addTrain('TR-' +
            Math.round(Math.random() * 100), segment.id, true);
    }
}
