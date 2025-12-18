"use client";

import { Box } from "@mui/material";
import { GeneratorResult } from "@/lib/bingo";
import { CardStyle } from "@/hooks";
import BingoCard from "./BingoCard";

interface BingoPrintLayoutProps {
  result: GeneratorResult;
  style: CardStyle;
  cardsPerPage?: 1 | 2 | 4 | 6;
}

const BingoPrintLayout: React.FC<BingoPrintLayoutProps> = ({
  result,
  style,
  cardsPerPage = 4,
}) => {
  const pages = [];

  for (let i = 0; i < result.cards.length; i += cardsPerPage) {
    const pageCards = result.cards.slice(i, i + cardsPerPage);

    pages.push(
      <Box
        key={`page-${i / cardsPerPage}`}
        className={`print-page cards-${cardsPerPage}`}
        sx={{ pageBreakAfter: "always", display: "grid", gap: 2 }}
      >
        {pageCards.map((card) => (
          <BingoCard
            key={card.id}
            card={card}
            title={result.meta.title}
            footer={result.meta.footer}
            gameNumber={result.meta.gameNumber}
            style={style}
          />
        ))}
      </Box>
    );
  }

  return <>{pages}</>;
};

export default BingoPrintLayout;
