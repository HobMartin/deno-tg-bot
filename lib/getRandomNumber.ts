// 1 == 100%
// 2 == 100%
export function getRandomNumber(): number {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const weights = [1, 1, 1, 0.8, 0.8, 0.7, 0.7, 0.5, 0.5, 0.3];
  const weightedIndex = weightedRandom(weights);
  return values[weightedIndex];
}

function weightedRandom(weights: number[]): number {
  const totalWeight = weights.reduce((acc, w) => acc + w, 0);
  let random = Math.random() * totalWeight;
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random < 0) {
      return i;
    }
  }
  return weights.length - 1;
}
