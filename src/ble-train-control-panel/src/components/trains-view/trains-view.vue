<template>
  <div>
    <train-add
      v-if="addingTrainToSegment"
      v-on:add-train="addTrain"
    ></train-add>
    <train-view v-for="train in trainsList"
      v-bind:train="train"
    ></train-view>
  </div>
</template>

<script lang="ts">
  import TrainAdd from '@/components/trains-view/train-add.vue';
  import { Unsubscriber } from '@/store/observer';
  import {
    StoreInterface,
    storeInterfaceInjectorKey,
  } from '@/store/store-interface';
  import { Segment } from '@logic/models/segment';
  import { Train } from '@logic/models/train';
  import { Component, Emit, Inject, Prop, Vue } from 'vue-property-decorator';
  import TrainView from './train-view.vue';

  @Component({
    components: {
      TrainAdd,
      TrainView,
    },
  })
  export default class TrainsView extends Vue {
    @Prop() addingTrainToSegment!: Segment | null;

    @Emit() addTrain(): Segment {
      return this.addingTrainToSegment!;
    }

    trainsList: Train[] = [];

    trainsList$$: Unsubscriber| null = null;

    @Inject(storeInterfaceInjectorKey) readonly storeInterface!: StoreInterface;

    created() {
      this.trainsList$$ = this.storeInterface.trainsList$((trains: Train[]) => {
        this.trainsList = trains;
        console.log('TrainsView. Updated Trains: ', trains);
      });
    }

    destroyed() {
      if (this.trainsList$$)
        this.trainsList$$();
    }
  }
</script>

<style scoped>

</style>
