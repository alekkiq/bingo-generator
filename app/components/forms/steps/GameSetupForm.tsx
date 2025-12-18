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
import { ExpandMore, Info, CloudUpload } from "@mui/icons-material";
import { GeneratorConfig } from "@/schemas/generator";

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
      <TextField
        label="Title"
        type="text"
        fullWidth
        value={game.title ?? ""}
        onChange={(e) =>
          onChange({ title: e.target.value === "" ? "" : e.target.value })
        }
      />
      <TextField
        label="Footer text"
        type="text"
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
