import {
  StoreInterface,
  storeInterfaceInjectorKey,
} from '@/store/store-interface';
import { Switch, SwitchPosition } from '@logic/models/switch';
import { Inject, Prop, Vue } from 'vue-property-decorator';

export class LayoutElemSwitch extends Vue {
  @Prop() data!: Switch;
  @Inject(storeInterfaceInjectorKey) readonly storeInterface!: StoreInterface;

  switchPositionStraight = SwitchPosition.Straight;
  switchPositionTurnout = SwitchPosition.Turnout;

  toggleSwitch(event: Event) {
    const newPosition = this.data.position === SwitchPosition.Straight ?
      SwitchPosition.Turnout : SwitchPosition.Straight;
    this.storeInterface.switchChange(
      this.data.id,
      newPosition,
      true,
    );
  }
}