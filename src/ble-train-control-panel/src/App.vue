<template>
  <div id="app">
    <layout-view
      v-on:train-presence-click="trainPresenceClick"
    ></layout-view>
  </div>
</template>

<script lang="ts">
  import LayoutView from '@/components/layout-view/layout-view.vue';
  import {
    StoreInterface,
    storeInterfaceInjectorKey,
  } from '@/store/store-interface';
  import { createStoreInterface } from '@/store/create-store-interface';
  import { Segment } from '@logic/models/segment';
  import { Train } from '@logic/models/train';
  import { Component, Provide, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      LayoutView,
    },
  })
  export default class App extends Vue {
    @Provide(storeInterfaceInjectorKey) storeInterface: StoreInterface = createStoreInterface();

    trainPresenceClick(
      segment: Segment,
      train: Train,
    ): void {
      console.log('trainPresenceClick():', segment, train);
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
