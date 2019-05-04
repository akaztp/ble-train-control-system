<template>
  <div
    v-on:click="click()"
    v-bind:class="{'add-train': !train}"
  >
    <span v-if="!train"
      class="indicator"
      v-bind:title="segment.id">+</span>
    <span v-if="train"
      v-bind:class="{indicator: true, moving: train.speed !== 0, stopped: train.speed === 0}"
      v-bind:title="segment.id">{{train.name}}</span>
  </div>
</template>

<script lang="ts">
  import { Segment } from '@logic/models/segment';
  import { Train } from '@logic/models/train';
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class LayoutElemTrainPresence extends Vue {
    @Prop() train!: Train | null;
    @Prop() segment!: Segment;

    @Emit() click(): void {}
  }
</script>

<style scoped lang="scss">
  div {
    width: auto;
    min-width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #f0f0f0;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 2px;

    &.add-train {
      cursor: pointer;
      &:hover {
        background-color: #606060;
      }
    }

    .indicator {
      color: #f0f0f0;
      font-size: 18px;
      font-weight: bold;
      line-height: 1;
      white-space: nowrap;
      &.stopped {
        color: #f06060;
      }
      &.moving {
        color: #60d060;
        font-style: italic;
      }
    }
  }
</style>
