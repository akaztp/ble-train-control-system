<template>
  <div>
    <train-view v-for="train in trainsList"
      v-bind:train="train"
      v-on:rev-click="changeSpeed(train.id, -1)"
      v-on:fw-click="changeSpeed(train.id, 1)"
      v-on:stop-click="changeSpeed(train.id, 0)"
    ></train-view>
  </div>
</template>

<script lang="ts" src="./trains-view.ts"></script>
