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
  MenuItem,
} from "@mui/material";
import { ExpandMore, Info, CloudUpload } from "@mui/icons-material";

const PrintOptionsForm = ({ options, onChange }) => {
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
            count: e.target.value === "" ? "" : Number(e.target.value),
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
            perPage: e.target.value === "" ? "" : Number(e.target.value),
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
