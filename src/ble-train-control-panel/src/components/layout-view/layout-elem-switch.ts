import { Switch, SwitchPosition } from '@logic/models/switch';
import { Inject, Prop, Vue } from 'vue-property-decorator';
import { StoreInterface, storeInterfaceInjectorKey } from '../../store/store-interface';

export class LayoutElemSwitch extends Vue {
    @Prop() data!: Switch;
    @Inject(storeInterfaceInjectorKey) readonly storeInterface!: StoreInterface;

    switchPositionStraight = SwitchPosition.Straight;
    switchPositionTurnout = SwitchPosition.Turnout;

    toggleSwitch(event: Event) {
        if (this.data.enabled) {
            const newPosition = this.data.pos === SwitchPosition.Straight ?
                SwitchPosition.Turnout : SwitchPosition.Straight;
            this.storeInterface.switchChanger(
                this.data.id,
                newPosition,
                true,
            );
        }
    }
}
