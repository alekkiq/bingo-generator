"use client";

import { ChangeEvent } from "react";
import { useUpload } from "@/hooks";
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import LabeledInput from "../fields/LabeledInput";
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
    <>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
        Card styling
      </Typography>

      <Grid container spacing={1}>
        <Grid size={12}>
          <Typography
            fontWeight={500}
            variant="caption"
            className="text-neutral-600"
            component="h3"
            textTransform="uppercase"
            marginBlockEnd={"-0.25rem"}
          >
            General colors
          </Typography>
        </Grid>
        <Grid size={6}>
          <MuiColorInput
            format="hex"
            variant="filled"
            label="Background color"
            fullWidth
            value={styles.background}
            onChange={(col) => onChange({ background: col })}
          />
        </Grid>
        <Grid size={6}>
          <MuiColorInput
            format="hex"
            variant="filled"
            label="Text color"
            fullWidth
            value={styles.textColor}
            onChange={(col) => onChange({ textColor: col })}
          />
        </Grid>
        <Grid size={12}>
          <MuiColorInput
            format="hex"
            variant="filled"
            label="Game number background"
            fullWidth
            value={styles.gameNumberBackground}
            onChange={(col) => onChange({ gameNumberBackground: col })}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid size={12}>
          <Typography
            fontWeight={500}
            variant="caption"
            className="text-neutral-600"
            component="h3"
            textTransform="uppercase"
            marginBlockEnd={"-0.25rem"}
          >
            Grid colors
          </Typography>
        </Grid>
        <Grid size={6}>
          <MuiColorInput
            format="hex"
            variant="filled"
            label="Grid background"
            fullWidth
            value={styles.tableColor}
            onChange={(col) => onChange({ tableColor: col })}
          />
        </Grid>
        <Grid size={6}>
          <MuiColorInput
            format="hex"
            variant="filled"
            label="Grid border color"
            fullWidth
            value={styles.borderColor}
            onChange={(col) => onChange({ borderColor: col })}
          />
        </Grid>
      </Grid>
      <TextField
        label="Font family"
        fullWidth
        value={styles.fontFamily}
        onChange={(e) => onChange({ fontFamily: e.target.value })}
      />

      <LabeledInput
        id="font-family"
        label="Font family"
        type="select"
        variant="filled"
        fullWidth
        value={styles.fontFamily}
        onChange={(e) => onChange({ fontFamily: e.target.value })}
      />

      {freeCenter && (
        <Grid container spacing={2}>
          <Grid size={6}>
            {!styles.freeCenterImage ? (
              <LabeledInput
                id="free-center-text"
                label="Free center text"
                type="text"
                variant="filled"
                fullWidth
                value={styles.freeCenterContent ?? ""}
                onChange={(e) =>
                  onChange({ freeCenterContent: e.target.value })
                }
              />
            ) : (
              <LabeledInput
                id="free-center-image"
                label="Free center image"
                fullWidth
                input={
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
                }
              />
            )}
          </Grid>
          <Grid size={6}>
            <FormControlLabel
              label="Use an image instead"
              sx={{ marginInlineStart: 0 }}
              control={
                <Switch
                  checked={!!styles.freeCenterImage}
                  onChange={(e) =>
                    handleToggleFreeCenterImage(e.target.checked)
                  }
                />
              }
            />
          </Grid>
        </Grid>
      )}
      <p></p>
      {/* commented out for now
      <TextField
        label="Custom CSS"
        fullWidth
        multiline
        minRows={4}
        placeholder=".bingo-card { border: 3px dashed red; }"
        value={styles.customCss ?? ""}
        onChange={(e) => onChange({ customCss: e.target.value })}
        sx={{ mt: 2 }}
      />
      */}
    </>
  );
};

export default AppearanceForm;
