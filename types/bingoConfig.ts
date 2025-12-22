export interface GameConfig {
  title: string;
  footer: string;
  gameNumber: number;
  emptyGrid: boolean;
  unique: boolean;
  freeCenter: boolean;
}

export const CARDS_PER_PAGE_OPTIONS = [1, 2, 4, 6] as const;
export type CardsPerPage = (typeof CARDS_PER_PAGE_OPTIONS)[number];

export const PRINTING_FORMATS = ["pdf", "html"] as const;
export type PrintingFormat = (typeof PRINTING_FORMATS)[number];

export interface PrintingConfig {
  count: number;
  perPage: CardsPerPage;
  format: PrintingFormat;
}

export interface BingoConfig {
  game: GameConfig;
  printing: PrintingConfig;
}
