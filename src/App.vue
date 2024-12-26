<script setup lang="ts">
import MarketSimulator from './components/MarketSimulator.vue'
</script>

<template>
  <div class="app">
    <h1>Random Walk Market Simulator</h1>
    <MarketSimulator />
  </div>
</template>

<style>
.app {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #42b883;
  margin-bottom: 30px;
}
</style>