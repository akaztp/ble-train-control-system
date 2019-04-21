<template>
  <div class="layout-view"
    v-bind:style="{width: canvas.x + 'px', height: canvas.y + 'px'}">
    <template v-for="p in primitives">
      <layout-elem
        v-bind:primitive="p"
        v-bind:scale="scale"></layout-elem>
    </template>
  </div>
</template>

<script lang="ts">
  import { trackLayout } from '@layout/track-layout';
  import { Pos } from '@logic/models/base';
  import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
  import { Component, Vue } from 'vue-property-decorator';
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
    private canvas: Pos = getCanvasPx();
    private primitives: PlacedPrimitive[] = trackLayout.primitives;
    private scale: number = scale;
  }

</script>

<style lang="scss" scoped>
  .layout-view {
    position: relative;
    background-color: #333333;
  }
</style>
