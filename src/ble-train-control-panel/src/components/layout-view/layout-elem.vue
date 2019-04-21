<template>
  <div>
    <div
      v-for="p in expandPrimitive()"
      v-bind:style="p.style"
      class="layout-view-primitive"
    >
      <layout-elem-straight v-if="p.primitive === primitiveStraight"></layout-elem-straight>
      <layout-elem-diagonal v-if="p.primitive === primitiveDiagonal"></layout-elem-diagonal>
      <layout-elem-switch-left v-if="p.primitive === primitiveSwitchLeft" v-bind:data="p.data"></layout-elem-switch-left>
      <layout-elem-switch-right v-if="p.primitive === primitiveSwitchRight" v-bind:data="p.data"></layout-elem-switch-right>
      <layout-elem-signal-light v-if="p.primitive === primitiveSignalLight" v-bind:data="p.data"></layout-elem-signal-light>
    </div>
  </div>
</template>

<script lang="ts">
  import { Data } from '@logic/models/base';
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
  import { Primitive } from '@logic/models/layout-descriptor/primitive';
  import LayoutElemDiagonal from './layout-elem-diagonal.vue';
  import LayoutElemStraight from './layout-elem-straight.vue';
  import LayoutElemSwitchRight from './layout-elem-switch-right.vue';
  import LayoutElemSwitchLeft from './layout-elem-switch-left.vue';
  import LayoutElemSignalLight from './layout-elem-signal-light.vue';

  @Component({
    components: {
      LayoutElemStraight,
      LayoutElemDiagonal,
      LayoutElemSwitchLeft,
      LayoutElemSwitchRight,
      LayoutElemSignalLight,
    },
  })
  export default class LayoutElem extends Vue {
    @Prop() private primitive!: PlacedPrimitive;
    @Prop() private scale!: number;

    private primitiveStraight = Primitive.Straight;
    private primitiveDiagonal = Primitive.Diagonal;
    private primitiveSwitchLeft = Primitive.SwitchLeft;
    private primitiveSwitchRight = Primitive.SwitchRight;
    private primitiveSignalLight = Primitive.SignalLight;

    private expandPrimitive(): PrimitiveInstance[] {
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

    private createPrimitiveInstance(x: number, y: number): PrimitiveInstance {
      return {
        primitive: this.primitive.primitive,
        data: this.primitive.data,
        style: {
          left: x * this.scale + 'px',
          top: y * this.scale + 'px',
          width: this.scale + 'px',
          height: this.scale + 'px',
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
</style>
