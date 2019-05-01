<template>
  <div>
    <span>Add Train to layout</span>
    <button v-on:click="addTrain">Add</button>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class TrainAdd extends Vue {
    @Emit() addTrain() {
    }
  }
</script>

<style scoped>

</style>
