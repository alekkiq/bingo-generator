import { useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { useGeneratorConfig } from "../../hooks/useGeneratorConfig";

import BingoPreview from "../preview/BingoPreview";
import FormsPanel from "../forms/FormsPanel";

const GeneratorLayout = () => {
  const { config, updateGame, updateStyle, updatePrintOptions } =
    useGeneratorConfig();

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item size={{ xs: 12, sm: 6, md: 7 }}>
          <FormsPanel
            config={config}
            updateGame={updateGame}
            updateStyle={updateStyle}
            updatePrintOptions={updatePrintOptions}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 5 }}>
          <BingoPreview game={config.game} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneratorLayout;
