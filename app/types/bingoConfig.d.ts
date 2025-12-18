export interface GameConfig {
  title: string;
  footer: string;
  gameNumber: number;
  forceUnique: boolean;
  freeCenter: boolean;
}

export interface PrintingConfig {
  count: number;
  perPage: number;
}

export interface BingoConfig {
  game: GameConfig;
  printing: PrintingConfig;
}
