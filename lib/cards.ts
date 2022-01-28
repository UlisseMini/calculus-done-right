export type CardType = "memory" | "mult";

export type CardData<T> = {
  type: CardType;
  data: T;
};

export type CardDataMemory = {
  prompt: string;
  answer: string;
};

export type CardDataMult = {
  prompt: string;
  options: string[];
  explain: string;
};

export const cardMemory = (
  prompt: string,
  answer: string
): CardData<CardDataMemory> => {
  return { data: { prompt, answer }, type: "memory" };
};

export const cardMult = (
  prompt: string,
  options: string[],
  explain: string
): CardData<CardDataMult> => {
  return { data: { prompt, options, explain }, type: "mult" };
};
