<template>
  <div id="app">
    <layout-view></layout-view>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import HelloWorld from '@/components/HelloWorld.vue';
  import LayoutView from '@/components/layout-view/layout-view.vue';

  @Component({
    components: {
      HelloWorld,
      LayoutView,
    },
  })
  export default class App extends Vue {
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
