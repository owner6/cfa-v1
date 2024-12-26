<script setup lang="ts">
import MarketChart from './MarketChart.vue';
import MarketParameters from './MarketParameters.vue';
import { useMarketSimulation } from '../composables/useMarketSimulation';

const {
  parameters,
  state,
  resetSimulation,
  generateStep,
  generateFullSimulation
} = useMarketSimulation();
</script>

<template>
  <div class="simulator">
    <MarketParameters
      :parameters="parameters"
      @update:parameters="newParams => Object.assign(parameters, newParams)"
    />

    <div class="controls">
      <button @click="resetSimulation">Reset</button>
      <button 
        @click="generateStep"
        :disabled="state.currentStep >= parameters.timeSteps"
      >Next Step</button>
      <button @click="generateFullSimulation">Generate Full Simulation</button>
    </div>

    <MarketChart :price-history="state.priceHistory" />

    <div class="stats">
      <p>Current Step: {{ state.currentStep }} / {{ parameters.timeSteps }}</p>
      <p>Current Price: {{ state.priceHistory[state.priceHistory.length - 1]?.toFixed(4) || parameters.initialPrice }}</p>
      <p>Last Volume: {{ state.volumeHistory[state.volumeHistory.length - 1] || 0 }}</p>
    </div>
  </div>
</template>

<style scoped>
.simulator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.stats {
  text-align: center;
  margin-top: 20px;
}

.stats p {
  margin: 5px 0;
}
</style>