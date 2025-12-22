import { z } from "zod";
import { PRINTING_FORMATS, CARDS_PER_PAGE_OPTIONS } from "@/types/bingoConfig";

export type GeneratorConfig = z.infer<typeof GeneratorSchema>;

export const GeneratorSchema = z.object({
  game: z.object({
    title: z.string(),
    footer: z.string().optional(),
    gameNumber: z.number().int().optional(),
    unique: z.boolean(),
    freeCenter: z.boolean(),
    emptyGrid: z.boolean(),
  }),
  printing: z.object({
    count: z.number().int().min(1).max(500),
    perPage: z.union(
      CARDS_PER_PAGE_OPTIONS.map((v) => z.literal(v)) as [
        z.ZodLiteral<1>,
        z.ZodLiteral<2>,
        z.ZodLiteral<4>,
        z.ZodLiteral<6>
      ]
    ),
    format: z.enum(PRINTING_FORMATS),
  }),
});

export const GeneratorRequestSchema = z.object({
  amount: z.coerce.number().int().min(1).max(500).default(8),
  freeCenter: z.coerce.boolean().default(false),
  freeCenterValue: z.string().optional(),
  emptyGrid: z.boolean().default(false),
  unique: z.coerce.boolean().default(true),
  seed: z.coerce.number().optional(),

  cardsPerPage: z.coerce
    .number()
    .int()
    .refine((v) => [1, 2, 4, 6].includes(v))
    .default(4),

  title: z.string().optional(),
  footer: z.string().optional(),
  gameNumber: z.coerce.number().optional(),
});
