import { SwitchPosition } from 'src/logic/models/layout-descriptor/switch';
<template>
    <svg xmlns="http://www.w3.org/2000/svg"
      v-if="data.position === switchPositionTurnout"
      @click="toggleSwitch($event)"
      version="1.1"
      baseProfile="full"
      height="100%"
      width="100%">
      <line x1="0" y1="50%" x2="50%" y2="50%"></line>
      <line x1="70%" y1="50%" x2="100%" y2="50%"></line>
      <line x1="50%" y1="50%" x2="100%" y2="-50%"></line>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg"
      v-else-if="data.position === switchPositionStraight"
      @click="toggleSwitch($event)"
      version="1.1"
      baseProfile="full"
      height="100%"
      width="100%">
      <line x1="0" y1="50%" x2="100%" y2="50%"></line>
      <line x1="60%" y1="30%" x2="100%" y2="-50%"></line>
    </svg>
</template>

<script lang="ts">
  import {
    Switch,
    SwitchPosition,
  } from '@logic/models/layout-descriptor/switch';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class LayoutElemSwitchLeft extends Vue {
    @Prop() private data!: Switch;

    private switchPositionStraight = SwitchPosition.Straight;
    private switchPositionTurnout = SwitchPosition.Turnout;

    toggleSwitch($event) {
      this.data.position = this.data.position === SwitchPosition.Straight ? SwitchPosition.Turnout : SwitchPosition.Straight;
    }
  }
</script>
