"use client";

import { Box, Paper } from "@mui/material";
import {
  CardGenerator,
  GeneratorResult,
  Cell,
  textCell,
  imageCell,
} from "@/lib/bingo";
import { GeneratorConfig } from "@/schemas/generator";
import { CardStyle } from "@/hooks";
import BingoCard from "./bingo/BingoCard";

interface BingoPreviewProps {
  game: GeneratorConfig["game"];
  style: CardStyle;
}

const BingoPreview: React.FC<BingoPreviewProps> = ({ game, style }) => {
  const freeCenterCell: Cell =
    style.freeCenterImage && style.freeCenterImageUrl
      ? imageCell(style.freeCenterImageUrl)
      : textCell(style.freeCenterContent ?? "FREE");

  const generator = new CardGenerator({
    title: game.title,
    footer: game.footer,
    gameNumber: game.gameNumber,
    freeCenterCell: freeCenterCell,
  });

  const result: GeneratorResult = generator.generate(1, game.freeCenter);

  return (
    <Paper sx={{ height: "100%", overflow: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <BingoCard
          card={result.cards[0]}
          title={result.meta.title}
          footer={result.meta.footer}
          gameNumber={result.meta.gameNumber}
          style={style}
        />
      </Box>
    </Paper>
  );
};

export default BingoPreview;
