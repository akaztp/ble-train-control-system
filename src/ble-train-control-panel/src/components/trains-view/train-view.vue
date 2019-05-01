<template>
<div>Train {{train.name}}</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Train } from '@logic/models/train';

  @Component({
    components: {
    },
  })
  export default class TrainView extends Vue {
    @Prop() train!: Train;

  }
</script>

<style scoped>

</style>
