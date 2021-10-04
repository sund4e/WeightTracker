import { moveDate } from './utils';
export type WeightData = Record<string, number>;

const weights: WeightData = {
  [moveDate(-10)]: 55,
  [moveDate(-9)]: 53,
  [moveDate(-8)]: 52,
  [moveDate(-7)]: 53,
  [moveDate(-6)]: 53.5,
  [moveDate(-5)]: 53,
  [moveDate(-4)]: 52,
  [moveDate(-3)]: 51,
  [moveDate(-2)]: 51.5,
  [moveDate(-1)]: 50,
};

export const addWeight = (weight: number, date: string) => {
  weights[date] = weight;
};

export const getWeights = () => {
  return { ...weights };
};
