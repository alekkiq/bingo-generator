import { z } from "zod";

export const GeneratorSchema = z.object({
  game: z.object({
    title: z.string(),
    footer: z.string().optional(),
    gameNumber: z.number().int().optional(),
    seed: z.string().optional(),
    forceUnique: z.boolean(),
    freeCenter: z.boolean(),
  }),
  printing: z.object({
    count: z.number().int().min(1).max(500),
    perPage: z.number().int().min(1).max(6),
  }),
  style: z.object({
    background: z.string(),
    tableColor: z.string(),
    textColor: z.string(),
    fontFamily: z.string(),
    gameNumberBackground: z.string(),
    freeCenterContent: z.string().optional(),
    freeCenterImage: z.boolean().optional(),
    freeCenterImageUrl: z.string().optional(),
  }),
});
