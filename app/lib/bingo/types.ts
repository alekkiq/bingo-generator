export type TextCell = {
  type: "text";
  value: string;
};

export type ImageCell = {
  type: "image";
  src: string;
};

export type NumberCell = {
  type: "number";
  value: number;
};

export type Cell = TextCell | ImageCell | NumberCell;

export interface Card {
  B: Cell[];
  I: Cell[];
  N: Cell[];
  G: Cell[];
  O: Cell[];
}

export type ColumnKey = keyof Card;

export interface GeneratedCard {
  id: number;
  grid: Cell[][];
}

export interface GeneratorMeta {
  title: string;
  footer: string;
  gameNumber?: number;
}

export interface GeneratorResult {
  meta: GeneratorMeta;
  cards: GeneratedCard[];
}

export const cardAsMatrix = (card: Card): Cell[][] => {
  return Array.from({ length: 5 }, (_, r) => [
    card.B[r],
    card.I[r],
    card.N[r],
    card.G[r],
    card.O[r],
  ]);
};
