import { NextRequest, NextResponse } from "next/server";
import { GeneratorRequestSchema } from "@/schemas/generator";
import { CardGenerator } from "@/lib/bingo";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const parsed = GeneratorRequestSchema.safeParse(
    Object.fromEntries(searchParams)
  );

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const params = parsed.data;

  const generator = new CardGenerator({
    title: params.title,
    footer: params.footer,
    gameNumber: params.gameNumber,
  });

  const result = generator.generate(
    params.amount,
    params.freeCenter,
    params.unique,
    undefined
  );

  return NextResponse.json(result);
};
