<template>
  <div class="panel">
    <div class="dashboard">
      <div class="dashboard__cell title">Add Train to Layout</div>
    </div>
    <div class="dashboard">
      <div class="dashboard__cell note">
        <div class="attention">ATTENTION!</div>
        Please make sure the train is placed on the layout and in the SPECIFIED segment ONLY AFTER connecting to it.
      </div>
      <div class="dashboard__cell">Searching for Bluetooth LE trains...
      </div>
      <div class="dashboard__cell dashboard__cell--grow"></div>
      <div class="dashboard__cell">
        <button v-on:click="addTrain">Add Simulated Train</button>
      </div>
    </div>  </div>
</template>

<script lang="ts">
  import { Component, Emit, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class TrainAdd extends Vue {
    @Emit() addTrain(): void {}
  }
</script>

<style scoped lang="scss">
  @import "../../styles/train-panel";

  .panel {
    @extend %train-panel;
    .title {
      @extend %train-panel__title;
    }
    .note {
      max-width: 250px;
      font-size: $font-size-note;
      .attention {
        color: red;
      }
    }
  }
</style>
