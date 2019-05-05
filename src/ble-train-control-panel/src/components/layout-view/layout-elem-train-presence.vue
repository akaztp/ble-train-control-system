<template>
  <div class="container"
    v-on:click="click()"
    v-bind:class="{'add-train': !train}"
  >
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      baseProfile="full"
      height="100%"
      width="10px"
      preserveAspectRatio="none"
      style="left: 100%"
      v-if="train && data.id === 0"
    >
      <rect x="0%" y="20%" width="100%" height="60%" style="fill: #f0f0f0; stroke-width: 0"></rect>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      baseProfile="full"
      height="100%"
      width="10px"
      preserveAspectRatio="none"
      style="left: 0"
      v-if="train && data.id === 1"
    >
      <rect x="-100%" y="20%" width="100%" height="60%" style="fill: #f0f0f0; stroke-width: 0"></rect>
    </svg>
    <span v-if="!train"
      class="indicator"
      v-bind:title="segment.id">+</span>
    <span v-if="train"
      v-bind:class="{indicator: true, moving: train.speed !== 0, stopped: train.speed === 0}"
      v-bind:title="segment.id">{{train.name}}</span>
  </div>
</template>

<style scoped lang="scss">
  .container {
    width: auto;
    min-width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #f0f0f0;
    border-radius: 4px;
    padding: 2px;

    &.add-train {
      cursor: pointer;

      &:hover {
        background-color: #606060;
      }
    }

    .indicator {
      color: #f0f0f0;
      font-size: 18px;
      font-weight: bold;
      line-height: 1;
      white-space: nowrap;

      &.stopped {
        color: #f06060;
      }

      &.moving {
        color: #60d060;
        font-style: italic;
      }
    }

    svg {
      position: absolute;
      overflow: visible;
    }
  }
</style>

<script lang="ts" src="./layout-elem-train-presence.ts"></script>
