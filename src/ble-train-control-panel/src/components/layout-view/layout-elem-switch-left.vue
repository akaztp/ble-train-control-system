<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    v-if="data.position === switchPositionTurnout"
    @click="toggleSwitch($event)"
    v-bind:class="{selectable: data.enabled}"
    version="1.1"
    baseProfile="full"
    height="100%"
    width="100%">
    <line x1="0" y1="50%" x2="33%" y2="50%"></line>
    <line x1="60%" y1="50%" x2="100%" y2="50%"></line>
    <line x1="33%" y1="50%" x2="100%" y2="-50%"></line>
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg"
    v-else-if="data.position === switchPositionStraight"
    @click="toggleSwitch($event)"
    v-bind:class="{selectable: data.enabled}"
    version="1.1"
    baseProfile="full"
    height="100%"
    width="100%">
    <line x1="0" y1="50%" x2="100%" y2="50%"></line>
    <line x1="46.6%" y1="30%" x2="100%" y2="-50%"></line>
  </svg>
</template>

<script lang="ts">
  import { LayoutElemSwitch } from './layout-elem-switch';
  import { Component } from 'vue-property-decorator';

  @Component({})
  export default class LayoutElemSwitchLeft extends LayoutElemSwitch {
  }
</script>
