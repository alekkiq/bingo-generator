import { CardGenerator } from "@/lib/bingo";
import { GeneratorRequestSchema } from "@/schemas/generator";

const PrintCardsPage = ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const parsed = GeneratorRequestSchema.parse(searchParams);
  const generator = new CardGenerator(parsed);
  const result = generator.generate();
  return <div>PrintCardsPage</div>;
};

export default PrintCardsPage;
