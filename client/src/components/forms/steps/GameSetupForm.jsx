import { useState } from "react";
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
import { useUpload } from "../../../hooks/useUpload";

const GameSetupForm = ({ game, onChange }) => {
  const { uploadFile, uploading, error: uploadError } = useUpload();

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const url = await uploadFile(file);

    if (url) {
      onChange({
        freeCenterImage: true,
        freeCenterImageUrl: url,
      });
    }

    event.target.value = "";
  };

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
          onChange({ title: e.target.value === "" ? "" : e.target.value })
        }
      />
      <TextField
        label="Game number"
        type="number"
        fullWidth
        value={game.gameNumber ?? ""}
        onChange={(e) =>
          onChange({
            title: e.target.value === "" ? "" : Number(e.target.value),
          })
        }
      />
      <FormControlLabel
        label="Free center tile"
        fullWidth
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
