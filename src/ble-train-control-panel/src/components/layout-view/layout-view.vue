<template>
  <div class="layout-view"
    v-bind:style="{width: canvas.x, height: canvas.y}">
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
    import { PlacedPrimitive } from '@logic/models/layout-descriptor/placed-primitive';
    import { Segment } from '@logic/models/segment';
    import { Train } from '@logic/models/train';
    import { Component, Emit, Vue } from 'vue-property-decorator';
    import LayoutElem from './layout-elem.vue';

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

        scale = 1 / trackLayout.canvas.x;
        canvas = {
            x: trackLayout.canvas.x * this.scale * 100 + 'vw',
            y: trackLayout.canvas.y * this.scale * 100 + 'vw',
        };
        primitives: PlacedPrimitive[] = trackLayout.primitives;
    }

</script>

<style lang="scss" scoped>
  .layout-view {
    position: relative;
    background-color: #333333;
  }
</style>
