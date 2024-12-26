// Utility functions for market calculations
export function calculateNextPrice(
  lastPrice: number,
  volatility: number,
  volumeVariance: number
): { price: number; volume: number } {
  const randomWalk = (Math.random() - 0.5) * volatility;
  const randomVolume = Math.floor(Math.random() * volumeVariance);
  const volumeImpact = (randomVolume / volumeVariance) * volatility;
  
  // Calculate new price with a minimum floor of 0.01
  const newPrice = Math.max(0.01, lastPrice + randomWalk + volumeImpact);
  
  return {
    price: newPrice,
    volume: randomVolume
  };
}