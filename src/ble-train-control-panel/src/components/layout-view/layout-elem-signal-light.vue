<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    @click="toggleSwitch($event)"
    version="1.1"
    baseProfile="full"
    height="100%"
    width="100%">
    <line x1="10%" y1="5%" x2="40%" y2="5%" style="stroke-width: 15%"></line>
    <rect x="40%"
      y="-20%"
      width="90%"
      height="50%"
      rx="20%"
      ry="20%"
      style="fill: white; stroke-width: 0;"></rect>
    <circle v-if="data.state === stateGreen"
      cx="65%"
      cy="5%"
      r="20%"
      style="fill: darkred; stroke-width: 0;"></circle>
    <circle v-if="data.state === stateGreen"
      cx="105%"
      cy="5%"
      r="20%"
      style="fill: lawngreen; stroke-width: 0;"></circle>
    <circle v-if="data.state === stateRed"
      cx="65%"
      cy="5%"
      r="20%"
      style="fill: red; stroke-width: 0;"></circle>
    <circle v-if="data.state === stateRed"
      cx="105%"
      cy="5%"
      r="20%"
      style="fill: darkgreen; stroke-width: 0;"></circle>
  </svg>
</template>

<script lang="ts">
  import {
    SignalLight,
    SignalLightState,
  } from '@logic/models/signal-light';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class LayoutElemSignalLight extends Vue {
    @Prop() data!: SignalLight;

    stateGreen = SignalLightState.Green;
    stateRed = SignalLightState.Red;

    toggleSwitch($event) {
      this.data.state =
        this.data.state === SignalLightState.Green ? SignalLightState.Red :
          SignalLightState.Green;
    }

  }
</script>
