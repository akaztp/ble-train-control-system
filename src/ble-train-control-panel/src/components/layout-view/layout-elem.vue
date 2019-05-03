<template>
  <div>
    <div
      v-for="p in expandPrimitive()"
      v-bind:style="p.style"
      class="layout-view-primitive"
      v-bind:title="dataId"
    >
      <layout-elem-straight v-if="p.primitive === primitiveStraight"></layout-elem-straight>
      <layout-elem-diagonal-l v-if="p.primitive === primitiveDiagonalL"></layout-elem-diagonal-l>
      <layout-elem-diagonal-r v-if="p.primitive === primitiveDiagonalR"></layout-elem-diagonal-r>
      <layout-elem-corner v-if="p.primitive === primitiveCorner"></layout-elem-corner>
      <layout-elem-switch-left v-if="p.primitive === primitiveSwitchLeft"
        v-bind:data="p.data"></layout-elem-switch-left>
      <layout-elem-switch-right v-if="p.primitive === primitiveSwitchRight"
        v-bind:data="p.data"></layout-elem-switch-right>
      <layout-elem-signal-light v-if="p.primitive === primitiveSignalLight"
        v-bind:data="p.data"></layout-elem-signal-light>
      <layout-elem-train-presence v-if="p.primitive === primitiveTrainPresence"
        v-bind:segment="primitive.segment"
        v-bind:train="train"
        v-on:click="trainPresenceClick(primitive.segment, train)"
      ></layout-elem-train-presence>
    </div>
  </div>
</template>

<script lang="ts">
  import LayoutElemTrainPresence
    from '@/components/layout-view/layout-elem-train-presence.vue';
  import { Unsubscriber } from '@/store/observer';
  import {
    StoreInterface,
    storeInterfaceInjectorKey,
  } from '@/store/store-interface';
  import { Data } from '@logic/models/base';
  import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
  import { Primitive } from '@logic/models/layout-descriptor/primitive';
  import { Segment } from '@logic/models/segment';
  import { Train } from '@logic/models/train';
  import { Component, Emit, Inject, Prop, Vue } from 'vue-property-decorator';
  import LayoutElemCorner from './layout-elem-corner.vue';
  import LayoutElemDiagonalL from './layout-elem-diagonal-l.vue';
  import LayoutElemDiagonalR from './layout-elem-diagonal-r.vue';
  import LayoutElemSignalLight from './layout-elem-signal-light.vue';
  import LayoutElemStraight from './layout-elem-straight.vue';
  import LayoutElemSwitchLeft from './layout-elem-switch-left.vue';
  import LayoutElemSwitchRight from './layout-elem-switch-right.vue';

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

    @Emit() trainPresenceClick(
      segment: Segment,
      train: Train,
    ) {}

    @Inject(storeInterfaceInjectorKey) readonly storeInterface!: StoreInterface;

    get dataId(): string {
      return this.primitive.data ? this.primitive.data.id.toString() : '';
    }

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

</script>

<style scoped lang="scss">
  div, svg {
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
  }

  .layout-view-primitive {
    stroke: #f0f0f0;
    stroke-width: 15%;
  }

  svg.selectable {
    background-color: rgba(127, 127, 127, 0.2);

    &:hover {
      background-color: rgba(127, 127, 127, 0.5);
    }
  }
</style>
