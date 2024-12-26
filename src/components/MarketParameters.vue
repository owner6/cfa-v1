<script setup lang="ts">
import type { MarketParameters } from '../types/market';

const props = defineProps<{
  parameters: MarketParameters;
}>();

const emit = defineEmits<{
  (e: 'update:parameters', value: MarketParameters): void;
}>();

function updateParameter(key: keyof MarketParameters, value: number) {
  emit('update:parameters', {
    ...props.parameters,
    [key]: value
  });
}
</script>

<template>
  <div class="parameters">
    <h2>Market Simulator Parameters</h2>
    <div class="parameter">
      <label>Initial Price:</label>
      <input 
        type="number" 
        :value="parameters.initialPrice"
        @input="e => updateParameter('initialPrice', +(e.target as HTMLInputElement).value)"
        step="0.1"
      >
    </div>
    <div class="parameter">
      <label>Volatility:</label>
      <input 
        type="number" 
        :value="parameters.volatility"
        @input="e => updateParameter('volatility', +(e.target as HTMLInputElement).value)"
        step="0.01"
      >
    </div>
    <div class="parameter">
      <label>Time Steps:</label>
      <input 
        type="number" 
        :value="parameters.timeSteps"
        @input="e => updateParameter('timeSteps', +(e.target as HTMLInputElement).value)"
      >
    </div>
    <div class="parameter">
      <label>Volume Variance:</label>
      <input 
        type="number" 
        :value="parameters.volumeVariance"
        @input="e => updateParameter('volumeVariance', +(e.target as HTMLInputElement).value)"
        step="0.1"
      >
    </div>
  </div>
</template>

<style scoped>
.parameters {
  margin-bottom: 20px;
}

.parameter {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.parameter label {
  width: 120px;
  text-align: right;
}

.parameter input {
  width: 100px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>