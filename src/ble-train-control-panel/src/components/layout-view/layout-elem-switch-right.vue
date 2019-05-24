<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    v-if="data.pos === switchPositionTurnout"
    @click="toggleSwitch($event)"
    v-bind:class="{selectable: data.enabled}"
    version="1.1"
    baseProfile="full"
    height="100%"
    width="100%">
    <line x1="0" y1="50%" x2="33%" y2="50%"></line>
    <line x1="60%" y1="50%" x2="100%" y2="50%"></line>
    <line x1="33%" y1="50%" x2="100%" y2="150%"></line>
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg"
    v-else-if="data.pos === switchPositionStraight"
    @click="toggleSwitch($event)"
    v-bind:class="{selectable: data.enabled}"
    version="1.1"
    baseProfile="full"
    height="100%"
    width="100%">
    <line x1="0" y1="50%" x2="100%" y2="50%"></line>
    <line x1="46.6%" y1="70%" x2="100%" y2="150%"></line>
  </svg>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import { LayoutElemSwitch } from './layout-elem-switch';

    @Component({})
  export default class LayoutElemSwitchRight extends LayoutElemSwitch {
  }
</script>
