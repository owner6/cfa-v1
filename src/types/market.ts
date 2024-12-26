export interface MarketState {
  currentStep: number;
  priceHistory: number[];
  volumeHistory: number[];
}

export interface MarketParameters {
  initialPrice: number;
  volatility: number;
  timeSteps: number;
  volumeVariance: number;
}