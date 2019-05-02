<template>
<div class="panel">
  <div>Train {{train.name}}</div>
  <div>
    <button v-on:click="revClick">REV</button>
    <button v-on:click="fwClick">FW</button>
    <button v-on:click="stopClick">STOP</button>
  </div>
  speed: {{train.speed}}
</div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import { Train } from '@logic/models/train';

  @Component({
    components: {
    },
  })
  export default class TrainView extends Vue {
    @Prop() train!: Train;
    @Emit() revClick(): void {}
    @Emit() fwClick(): void {}
    @Emit() stopClick(): void {}
  }
</script>

<style scoped>
.panel {
  width: 100%;
  background-color: #2c3e50;
  padding-bottom: 16px;
  color: white;
}
</style>
