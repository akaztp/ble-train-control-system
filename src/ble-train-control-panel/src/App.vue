<template>
  <div id="app">
    <layout-view></layout-view>
  </div>
</template>

<script lang="ts">
  import LayoutView from '@/components/layout-view/layout-view.vue';
  import {
    StoreInterface,
    storeInterfaceInjectorKey,
  } from '@/store/store-interface';
  import { createStoreInterface } from '@/store/train-control-panel';
  import { Component, Provide, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      LayoutView,
    },
  })
  export default class App extends Vue {
    @Provide(storeInterfaceInjectorKey) storeInterface: StoreInterface = createStoreInterface();
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
