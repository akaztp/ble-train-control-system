<template>
    <div class="panel">
        <div class="dashboard">
            <div class="dashboard__cell title">Train Control Dashboard</div>
            <div class="dashboard__cell dashboard__cell--grow"></div>
            <div class="dashboard__cell  train-id">
                <button v-on:click="invertClick" v-bind:disabled="!isSetupPossible()">
                    Invert Dir
                </button>
            </div>
            <div class="dashboard__cell  train-id">ID: {{train.id}}</div>
        </div>
        <div class="dashboard">
            <div class="dashboard__cell">
                <div class="train-name">{{train.name}}</div>
            </div>
            <div class="dashboard__cell">
                <button
                        v-bind:class="{dashboard__button: true, 'dashboard__button--highlight': train.speed < 0}"
                        v-on:click="revClick">««
                </button>
                <button
                        class="dashboard__button dashboard__button--stop"
                        v-on:click="stopClick"
                        v-bind:disabled="train.speed === 0"
                >STOP
                </button>
                <button
                        v-bind:class="{dashboard__button: true, 'dashboard__button--highlight': train.speed > 0}"
                        v-on:click="fwClick">»»
                </button>
            </div>
            <div class="dashboard__cell">
              <span v-if="train.speedBefStop !== 0">WAITING</span>
            </div>
            <div class="dashboard__cell dashboard__cell--grow"></div>
            <div class="dashboard__cell">
        <span
                v-if="isSimulated()"
        >
            Simulated Train
            <button v-on:click="connectClick" v-bind:disabled="!isSetupPossible()">Connect</button>
        </span>
        <span v-else>
            Connected
            <button v-on:click="disconnectClick">Disconnect</button>
        </span>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
    @import "../../styles/train-panel.scss";

    .panel {
        @extend %train-panel;

        .title {
            @extend %train-panel__title;
        }

        .train-name {
            font-size: 2rem;
        }

        .train-id {
            font-size: $font-size-note;
            color: $color-font-secondary;
        }
    }
</style>

<script lang="ts" src="./train-view.ts"></script>
