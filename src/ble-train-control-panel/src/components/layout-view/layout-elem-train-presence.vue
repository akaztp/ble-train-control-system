<template>
  <div><span class="indicator">{{trainName}}</span></div>
</template>

<script lang="ts">
  import { Segment } from '@logic/models/segment';
  import { Train } from '@logic/models/train';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class LayoutElemTrainPresence extends Vue {
    @Prop() train!: Train;
    @Prop() segment!: Segment;

    get trainName(): string {
      if (!this.train) {
        return '-';
      }
      return this.train.id.toString();
    }
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
    border: 4px solid #f0f0f0;
    border-radius: 2px;
    box-sizing: border-box;

    .indicator {
      color: #f0f0f0;
      font-size: 20px;
      font-weight: bold;
      line-height: 1;
    }
  }
</style>
