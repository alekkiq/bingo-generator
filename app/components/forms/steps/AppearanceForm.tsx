"use client";

import { ChangeEvent } from "react";
import { useUpload } from "@/hooks";
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
import { Info, CloudUpload } from "@mui/icons-material";
import { CardStyle } from "@/hooks";
import { GeneratorConfig } from "@/schemas/generator";

interface AppearanceFormProps {
  styles: CardStyle;
  freeCenter: GeneratorConfig["game"]["freeCenter"];
  onChange: (patch: Partial<CardStyle>) => void;
}

const AppearanceForm: React.FC<AppearanceFormProps> = ({
  styles,
  freeCenter,
  onChange,
}) => {
  const { uploadFile, uploading, error: uploadError } = useUpload();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleToggleFreeCenterImage = (checked: boolean) => {
    onChange({
      freeCenterImage: checked,
      ...(checked ? {} : { freeCenterImageUrl: undefined }),
    });
  };

  return (
    <Box>
      <Typography variant="h4" component="h2">
        Card styling
      </Typography>

      <TextField
        label="Card background"
        type="color"
        fullWidth
        value={styles.background}
        onChange={(e) => onChange({ background: e.target.value })}
      />
      <TextField
        label="Text color"
        type="color"
        fullWidth
        value={styles.textColor}
        onChange={(e) => onChange({ textColor: e.target.value })}
      />
      <TextField
        label="Table color"
        type="color"
        fullWidth
        value={styles.tableColor}
        onChange={(e) => onChange({ tableColor: e.target.value })}
      />
      <TextField
        label="Border color"
        type="color"
        fullWidth
        value={styles.borderColor}
        onChange={(e) => onChange({ borderColor: e.target.value })}
      />
      <TextField
        label="Game number background"
        type="color"
        fullWidth
        value={styles.gameNumberBackground}
        onChange={(e) => onChange({ gameNumberBackground: e.target.value })}
      />
      <TextField
        label="Font family"
        fullWidth
        value={styles.fontFamily}
        onChange={(e) => onChange({ fontFamily: e.target.value })}
      />
      {freeCenter && (
        <>
          <FormControlLabel
            label="Use image for free center"
            control={
              <Switch
                checked={!!styles.freeCenterImage}
                onChange={(e) => handleToggleFreeCenterImage(e.target.checked)}
              />
            }
          />

          {!styles.freeCenterImage ? (
            <TextField
              label="Free center text"
              fullWidth
              value={styles.freeCenterContent ?? ""}
              onChange={(e) => onChange({ freeCenterContent: e.target.value })}
            />
          ) : (
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              disabled={uploading}
              startIcon={<CloudUpload />}
            >
              Upload image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default AppearanceForm;
