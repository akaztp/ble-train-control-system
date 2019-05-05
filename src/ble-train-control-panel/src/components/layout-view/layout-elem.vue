<template>
  <div>
    <div
      v-for="p in expandPrimitive()"
      v-bind:style="p.style"
      class="layout-view-primitive"
      v-bind:title="dataId"
    >
      <layout-elem-straight v-if="p.primitive === primitiveStraight"></layout-elem-straight>
      <layout-elem-diagonal-l v-if="p.primitive === primitiveDiagonalL"></layout-elem-diagonal-l>
      <layout-elem-diagonal-r v-if="p.primitive === primitiveDiagonalR"></layout-elem-diagonal-r>
      <layout-elem-corner v-if="p.primitive === primitiveCorner"></layout-elem-corner>
      <layout-elem-switch-left v-if="p.primitive === primitiveSwitchLeft"
        v-bind:data="p.data"></layout-elem-switch-left>
      <layout-elem-switch-right v-if="p.primitive === primitiveSwitchRight"
        v-bind:data="p.data"></layout-elem-switch-right>
      <layout-elem-signal-light v-if="p.primitive === primitiveSignalLight"
        v-bind:data="p.data"
        v-bind:blocking="train && train.stoppedAtSignalLight === p.data.id"
      ></layout-elem-signal-light>
      <layout-elem-train-presence v-if="p.primitive === primitiveTrainPresence"
        v-bind:segment="primitive.segment"
        v-bind:train="train"
        v-bind:data="p.data"
        v-on:click="trainPresenceClick(primitive.segment, train)"
      ></layout-elem-train-presence>
    </div>
  </div>
</template>

<style scoped lang="scss">
  div, svg {
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
  }

  .layout-view-primitive {
    stroke: #f0f0f0;
    stroke-width: 15%;
  }

  svg.selectable {
    background-color: rgba(127, 127, 127, 0.4);
    cursor: pointer;

    &:hover {
      background-color: rgba(127, 127, 127, 0.8);
    }
  }
</style>

<script lang="ts" src="./layout-elem.ts"></script>
