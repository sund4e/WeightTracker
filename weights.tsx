export type WeightData = Record<string, number>;

const weights: WeightData = {};

export const addWeight = (weight: number) => {
  weights[new Date().toTimeString()] = weight;
};

export const getWeights = () => {
  return { ...weights };
};
