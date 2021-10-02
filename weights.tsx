const weights: Record<string, number> = {};

export const addWeight = (weight: number) => {
  weights[new Date().toTimeString()] = weight;
};

export const getWeights = () => {
  return { ...weights };
};
