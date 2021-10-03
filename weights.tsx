export type WeightData = Record<string, number>;

const getDate = (daysAgo: number) => {
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);
  return date.toDateString();
};

const weights: WeightData = {
  [getDate(10)]: 55,
  [getDate(9)]: 53,
  [getDate(8)]: 52,
  [getDate(7)]: 53,
  [getDate(6)]: 53.5,
  [getDate(5)]: 53,
  [getDate(4)]: 52,
  [getDate(3)]: 51,
  [getDate(2)]: 51.5,
  [getDate(1)]: 50,
};

export const addWeight = (weight: number) => {
  weights[new Date().toDateString()] = weight;
};

export const getWeights = () => {
  return { ...weights };
};
