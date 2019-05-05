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
}
