"use client";

import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { GeneratorConfig } from "@/schemas/generator";
import LabeledInput from "../fields/LabeledInput";

interface GameSetupFormProps {
  game: GeneratorConfig["game"];
  onChange: (patch: Partial<GeneratorConfig["game"]>) => void;
}

const GameSetupForm: React.FC<GameSetupFormProps> = ({ game, onChange }) => {
  return (
    <Box>
      <Typography variant="h4" component="h2">
        Game settings
      </Typography>

      <LabeledInput
        id="bingo-title"
        label="Game title"
        type="text"
        variant="filled"
        tooltip="Game title shown on top of each bingo card"
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
        tooltip="Additional text to show below the bingo card"
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
        tooltip="Additional text to show below the bingo card"
        fullWidth
        value={game.footer ?? ""}
        onChange={(e) =>
          onChange({ footer: e.target.value === "" ? "" : e.target.value })
        }
      />
      <TextField
        label="Game number"
        type="number"
        fullWidth
        value={game.gameNumber ?? ""}
        onChange={(e) =>
          onChange({
            gameNumber:
              e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
      <FormControlLabel
        label="Empty grid"
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
      <FormControlLabel
        label="Free center tile"
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
    </Box>
  );
};

export default GameSetupForm;
