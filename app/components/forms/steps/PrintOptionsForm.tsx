"use client";

import { Box, TextField, Typography, MenuItem } from "@mui/material";
import { GeneratorConfig } from "@/schemas/generator";

interface PrintOptionsFormProps {
  options: GeneratorConfig["printing"];
  onChange: (patch: Partial<GeneratorConfig["printing"]>) => void;
}

const PrintOptionsForm: React.FC<PrintOptionsFormProps> = ({
  options,
  onChange,
}) => {
  const perPageOptions = [1, 2, 4, 6];

  return (
    <Box>
      <Typography variant="h4" component="h2">
        Printing options
      </Typography>
      <TextField
        label="Number of Cards"
        type="number"
        fullWidth
        value={options.count ?? ""}
        onChange={(e) =>
          onChange({
            count: e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
      <TextField
        label="Cards per Page"
        select
        fullWidth
        value={options.perPage ?? ""}
        onChange={(e) =>
          onChange({
            perPage: e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      >
        {perPageOptions.map((option) => (
          <MenuItem key={`per-page-${option}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default PrintOptionsForm;
