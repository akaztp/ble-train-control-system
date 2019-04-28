<template>
  <div class="layout-view"
    v-bind:style="{width: canvas.x + 'px', height: canvas.y + 'px'}">
    <template v-for="p in primitives">
      <layout-elem
        v-bind:primitive="p"
        v-bind:scale="scale"
        v-on:train-presence-click="trainPresenceClick"
      ></layout-elem>
    </template>
  </div>
</template>

<script lang="ts">
  import { trackLayout } from '@layout/track-layout';
  import { Pos } from '@logic/models/base';
  import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
  import { Segment } from '@logic/models/segment';
  import { Train } from '@logic/models/train';
  import { Component, Emit, Vue } from 'vue-property-decorator';
  import LayoutElem from './layout-elem.vue';

  const scale = 30;

  function getCanvasPx(): Pos {
    return {
      x: trackLayout.canvas.x * scale,
      y: trackLayout.canvas.y * scale,
    } as Pos;
  }

  @Component({
    components: {
      LayoutElem,
    },
  })
  export default class LayoutView extends Vue {
    @Emit() trainPresenceClick(
      segment: Segment,
      train: Train,
    ) {}

    canvas: Pos = getCanvasPx();
    primitives: PlacedPrimitive[] = trackLayout.primitives;
    scale: number = scale;
  }

</script>

<style lang="scss" scoped>
  .layout-view {
    position: relative;
    background-color: #333333;
  }
</style>
