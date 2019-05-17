<template>
  <div>
    <train-view v-for="train in trainsList"
      v-bind:train="train"
      v-on:rev-click="changeSpeed(train.id, -1)"
      v-on:fw-click="changeSpeed(train.id, 1)"
      v-on:stop-click="changeSpeed(train.id, 0)"
      v-on:invert-click="invertTrainDir(train.id)"
      v-on:connect-click="connect(train.id)"
      v-on:disconnect-click="disconnect(train.id)"
    ></train-view>
  </div>
</template>

<script lang="ts" src="./trains-view.ts"></script>
