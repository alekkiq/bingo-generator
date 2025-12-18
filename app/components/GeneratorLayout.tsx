"use client";

import { Box, Grid, Paper } from "@mui/material";
import { useGeneratorConfig, useStyleConfig } from "@/hooks";

import BingoPreview from "./BingoPreview";
import FormsPanel from "./forms/FormsPanel";

const GeneratorLayout: React.FC = () => {
  const { config, updateGame, updatePrinting } = useGeneratorConfig();
  const { style, updateStyle } = useStyleConfig();

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid size={{ xs: 12, sm: 6, md: 7 }}>
          <FormsPanel
            gameConfig={config.game}
            printConfig={config.printing}
            styleConfig={style}
            updateGame={updateGame}
            updatePrinting={updatePrinting}
            updateStyle={updateStyle}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <BingoPreview game={config.game} style={style} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneratorLayout;
