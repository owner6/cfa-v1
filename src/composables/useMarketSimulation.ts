import { ref, reactive, computed } from 'vue';
import type { MarketState, MarketParameters } from '../types/market';
import { calculateNextPrice } from '../utils/marketCalculations';

const DEFAULT_PARAMETERS: MarketParameters = {
  initialPrice: 0.4,
  volatility: 0.1,
  timeSteps: 100,
  volumeVariance: 1
};

export function useMarketSimulation(initialParams: Partial<MarketParameters> = {}) {
  const parameters = reactive<MarketParameters>({ 
    ...DEFAULT_PARAMETERS,
    ...initialParams 
  });
  
  const currentStep = ref(0);
  const priceHistory = ref<number[]>([parameters.initialPrice]);
  const volumeHistory = ref<number[]>([0]);

  const state = computed<MarketState>(() => ({
    currentStep: currentStep.value,
    priceHistory: priceHistory.value,
    volumeHistory: volumeHistory.value
  }));

  function resetSimulation() {
    currentStep.value = 0;
    priceHistory.value = [parameters.initialPrice];
    volumeHistory.value = [0];
  }

  function generateStep() {
    if (currentStep.value >= parameters.timeSteps) return;

    const lastPrice = priceHistory.value[priceHistory.value.length - 1];
    const { price, volume } = calculateNextPrice(
      lastPrice,
      parameters.volatility,
      parameters.volumeVariance
    );
    
    priceHistory.value = [...priceHistory.value, price];
    volumeHistory.value = [...volumeHistory.value, volume];
    currentStep.value++;
  }

  function generateFullSimulation() {
    resetSimulation();
    while (currentStep.value < parameters.timeSteps) {
      generateStep();
    }
  }

  return {
    parameters,
    state,
    resetSimulation,
    generateStep,
    generateFullSimulation
  };
}