<template>
  <div id="app">
    <layout-view
      v-on:train-presence-click="trainPresenceClick"
    ></layout-view>
    <trains-view
      v-bind:addingTrainToSegment="addingTrainToSegment"
      v-on:add-train="addTrain"
    ></trains-view>
  </div>
</template>

<script lang="ts">
  import LayoutView from '@/components/layout-view/layout-view.vue';
  import TrainsView from '@/components/trains-view/trains-view.vue';
  import { createStoreInterface } from '@/store/create-store-interface';
  import {
    StoreInterface,
    storeInterfaceInjectorKey,
  } from '@/store/store-interface';
  import { Segment } from '@logic/models/segment';
  import { Train } from '@logic/models/train';
  import { Component, Provide, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      TrainsView,
      LayoutView,
    },
  })
  export default class App extends Vue {
    @Provide(storeInterfaceInjectorKey) storeInterface: StoreInterface = createStoreInterface();

    addingTrainToSegment: Segment | null = null;

    trainPresenceClick(
      segment: Segment,
      train: Train,
    ): void {
      console.log('trainPresenceClick():', segment, train);
      if (!train)
        this.addingTrainToSegment = segment;
    }

    addTrain(segment: Segment): void {
      this.storeInterface.addTrain('TR02', segment.id, true);
      this.addingTrainToSegment = null;
    }
  }

</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
