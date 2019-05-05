<template>
  <div id="app">
    <layout-view
      v-on:train-presence-click="trainPresenceClick"
    ></layout-view>
    <trains-view></trains-view>
  </div>
</template>

<style lang="scss" src="./styles/global.scss"></style>

<script lang="ts" src="./app.ts"></script>
