import { shuffle } from "@/utils/random";
import {
  Card,
  ColumnKey,
  cardAsMatrix,
  Cell,
  GeneratorMeta,
  GeneratorResult,
  GeneratedCard,
} from "./types";
import { textCell, imageCell, numberCell } from "./Cells";

export interface GeneratorOptions {
  title?: string;
  footer?: string;
  gameNumber?: number;
  freeCenterCell?: Cell;
}

export class CardGenerator {
  private meta: GeneratorMeta;
  private freeCenterCell: Cell;

  constructor(options: GeneratorOptions = {}) {
    this.meta = {
      title: options.title ?? "BINGO",
      footer: options.footer ?? "Good luck",
      gameNumber: options.gameNumber ?? undefined,
    };
    this.freeCenterCell = options.freeCenterCell ?? textCell("FREE");
  }

  private singleCard(freeCenter = false, freeCenterCell?: Cell): Card {
    const ranges: Record<ColumnKey, number[]> = {
      B: Array.from({ length: 15 }, (_, i) => i + 1),
      I: Array.from({ length: 15 }, (_, i) => i + 16),
      N: Array.from({ length: 15 }, (_, i) => i + 31),
      G: Array.from({ length: 15 }, (_, i) => i + 46),
      O: Array.from({ length: 15 }, (_, i) => i + 61),
    };

    const columns: Record<ColumnKey, Cell[]> = {
      B: [],
      I: [],
      N: [],
      G: [],
      O: [],
    };

    for (const col of Object.keys(ranges) as ColumnKey[]) {
      const rng = ranges[col];

      if (col === "N" && freeCenter) {
        const nums = shuffle(rng).slice(0, 4).map(numberCell);
        nums.splice(2, 0, this.freeCenterCell);
        columns[col] = nums;
      } else {
        columns[col] = shuffle(rng).slice(0, 5).map(numberCell);
      }
    }

    return columns;
  }

  public generate(
    count = 8,
    freeCenter = false,
    unique = true,
    freeCenterCell?: Cell
  ): GeneratorResult {
    const cards: GeneratedCard[] = [];
    const seen = new Set<string>();
    const maxAttempts = Math.max(10000, count * 1000);
    let attempts = 0;
    let id = 1;

    while (cards.length < count && attempts < maxAttempts) {
      attempts++;

      const card = this.singleCard(freeCenter, freeCenterCell);
      const key = JSON.stringify(card);

      if (unique && seen.has(key)) continue;
      seen.add(key);

      cards.push({
        id: id++,
        grid: cardAsMatrix(card),
      });
    }

    if (cards.length < count) {
      throw new Error("Could not generate requested number of unique cards");
    }

    return {
      meta: this.meta,
      cards,
    };
  }
}
