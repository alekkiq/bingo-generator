import { BingoConfig } from "@/types/bingoConfig";

export const defaultConfig: BingoConfig = {
  game: {
    title: "BINGO",
    footer: "Lycka till!",
    gameNumber: 1,
    emptyGrid: false,
    unique: true,
    freeCenter: false,
  },
  printing: {
    count: 30,
    perPage: 4,
    format: "pdf",
  },
};
