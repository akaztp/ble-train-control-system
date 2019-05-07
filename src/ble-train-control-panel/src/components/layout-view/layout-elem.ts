import { Data } from '@logic/models/base';
import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
import { Primitive } from '@logic/models/layout-descriptor/primitive';
import { Segment } from '@logic/models/segment';
import { Train } from '@logic/models/train';
import { Component, Emit, Inject, Prop, Vue } from 'vue-property-decorator';
import { Unsubscriber } from '../../store/observer';
import { StoreInterface, storeInterfaceInjectorKey } from '../../store/store-interface';
import LayoutElemCorner from './layout-elem-corner.vue';
import LayoutElemDiagonalL from './layout-elem-diagonal-l.vue';
import LayoutElemDiagonalR from './layout-elem-diagonal-r.vue';
import LayoutElemSignalLight from './layout-elem-signal-light.vue';
import LayoutElemStraight from './layout-elem-straight.vue';
import LayoutElemSwitchLeft from './layout-elem-switch-left.vue';
import LayoutElemSwitchRight from './layout-elem-switch-right.vue';
import LayoutElemTrainPresence from './layout-elem-train-presence';

@Component({
    components: {
        LayoutElemTrainPresence,
        LayoutElemStraight,
        LayoutElemCorner,
        LayoutElemSwitchLeft,
        LayoutElemSwitchRight,
        LayoutElemSignalLight,
        LayoutElemDiagonalL,
        LayoutElemDiagonalR,
    },
})
export default class LayoutElem extends Vue {
    @Prop() primitive!: PlacedPrimitive;
    @Prop() scale!: number;
    @Inject(storeInterfaceInjectorKey) readonly storeInterface!: StoreInterface;
    train: Train | null = null;
    train$$: Unsubscriber | null = null;
    primitiveStraight = Primitive.Straight;
    primitiveCorner = Primitive.Corner;
    primitiveDiagonalL = Primitive.DiagonalL;
    primitiveDiagonalR = Primitive.DiagonalR;
    primitiveSwitchLeft = Primitive.SwitchLeft;
    primitiveSwitchRight = Primitive.SwitchRight;
    primitiveSignalLight = Primitive.SignalLight;
    primitiveTrainPresence = Primitive.TrainPresence;

    get dataId(): string {
        return this.primitive.data ? this.primitive.data.id.toString() : '';
    }

    @Emit() trainPresenceClick(
        segment: Segment,
        train: Train,
    ) {}

    expandPrimitive(): PrimitiveInstance[] {
        const expansion: PrimitiveInstance[] = [];

        const fromPos = this.primitive.fromPos;
        let toPos = this.primitive.toPos;
        if (!toPos) {
            toPos = fromPos;
        }

        if (fromPos.x === toPos.x) {
            const dir = toPos.y > fromPos.y ? 1 : -1;
            let y = fromPos.y;
            do {
                expansion.push(this.createPrimitiveInstance(fromPos.x, y));
                y = y + dir;
            } while (y !== toPos.y + dir);
        } else {
            const dir = toPos.x > fromPos.x ? 1 : -1;
            let x = fromPos.x;
            do {
                expansion.push(this.createPrimitiveInstance(x, fromPos.y));
                x = x + dir;
            } while (x !== toPos.x + dir);
        }

        return expansion;
    }

    created() {
        if (this.primitive.segment) {
            this.train$$ = this.storeInterface.findTrainTouchingSegment$(
                (train: Train | null) => this.train = train,
                this.primitive.segment,
            );
        } else {
            this.train = null;
            if (this.train$$) {
                this.train$$();
                this.train$$ = null;
            }
        }
    }

    destroyed() {
        if (this.train$$) {
            this.train$$();
        }
    }

    private createPrimitiveInstance(x: number, y: number): PrimitiveInstance {
        return {
            primitive: this.primitive.primitive,
            data: this.primitive.data,
            style: {
                left: x * this.scale * 100 + 'vw',
                top: y * this.scale * 100 + 'vw',
                width: this.scale * 100 + 'vw',
                height: this.scale * 100 + 'vw',
                transform: 'rotate(' + this.primitive.rotation + 'deg)',
            },

        };
    }
}

interface PrimitiveInstance {
    primitive: Primitive;
    data: Data | null;
    style: {
        top: string,
        left: string,
        width: string,
        height: string,
        transform: string,
    };
}
