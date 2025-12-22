"use client";

import { Grid, Typography, FormControlLabel, Switch } from "@mui/material";
import { GeneratorConfig } from "@/schemas/generator";
import LabeledInput from "../fields/LabeledInput";

interface GameSetupFormProps {
  game: GeneratorConfig["game"];
  onChange: (patch: Partial<GeneratorConfig["game"]>) => void;
}

const GameSetupForm: React.FC<GameSetupFormProps> = ({ game, onChange }) => {
  return (
    <>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
        Game settings
      </Typography>

      <LabeledInput
        id="bingo-title"
        label="Game title"
        type="text"
        variant="filled"
        fullWidth
        value={game.title ?? ""}
        onChange={(e) =>
          onChange({ title: e.target.value === "" ? "" : e.target.value })
        }
      />
      <LabeledInput
        id="bingo-footer"
        label="Footer text"
        type="text"
        variant="filled"
        fullWidth
        value={game.footer ?? ""}
        onChange={(e) =>
          onChange({ footer: e.target.value === "" ? "" : e.target.value })
        }
      />
      <LabeledInput
        id="game-number"
        label="Game number"
        type="number"
        variant="filled"
        tooltip="Adds a number indicator to indicate which game / round is being played. Set as 0 for no numbering."
        fullWidth
        value={game.gameNumber ?? ""}
        onChange={(e) => {
          onChange({
            gameNumber: Number(e.target.value) < 0 ? 0 : Number(e.target.value),
          });
        }}
      />

      <Grid container spacing={2}>
        <Grid size={6}>
          <FormControlLabel
            label="Empty grid"
            sx={{ marginInlineStart: 0 }}
            control={
              <Switch
                checked={!!game.emptyGrid}
                onChange={(e) =>
                  onChange({
                    emptyGrid: e.target.checked,
                  })
                }
              />
            }
          />
        </Grid>
        <Grid size={6}>
          <FormControlLabel
            label="Free center tile"
            sx={{ marginInlineStart: 0 }}
            control={
              <Switch
                checked={!!game.freeCenter}
                onChange={(e) =>
                  onChange({
                    freeCenter: e.target.checked,
                  })
                }
              />
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GameSetupForm;
