"use client";

import { Box, TextField, Typography, MenuItem } from "@mui/material";
import LabeledInput from "../fields/LabeledInput";
import { GeneratorConfig } from "@/schemas/generator";
import {
  PRINTING_FORMATS,
  CARDS_PER_PAGE_OPTIONS,
  PrintingFormat,
  CardsPerPage,
} from "@/types/bingoConfig";

interface PrintOptionsFormProps {
  options: GeneratorConfig["printing"];
  onChange: (patch: Partial<GeneratorConfig["printing"]>) => void;
}

const PrintOptionsForm: React.FC<PrintOptionsFormProps> = ({
  options,
  onChange,
}) => {
  return (
    <>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
        Printing options
      </Typography>
      <LabeledInput
        id="number-of-cards"
        label="Number of cards"
        type="number"
        variant="filled"
        tooltip="Total amount of cards to print"
        fullWidth
        value={options.count ?? ""}
        onChange={(e) =>
          onChange({
            count: Number(e.target.value) < 1 ? 1 : Number(e.target.value),
          })
        }
      />
      <LabeledInput
        id="cards-per-page"
        label="Cards per page"
        tooltip="The amount of singular cards to wrap on a single A4 page"
        fullWidth
        input={
          <TextField
            label="Cards per page"
            select
            fullWidth
            variant="filled"
            value={options.perPage ?? ""}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (CARDS_PER_PAGE_OPTIONS.includes(value as CardsPerPage)) {
                onChange({ perPage: value as CardsPerPage });
              }
            }}
          >
            {CARDS_PER_PAGE_OPTIONS.map((option) => (
              <MenuItem key={`per-page-${option}`} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        }
      />

      <LabeledInput
        id="print-format"
        label="Output format"
        tooltip="Choose whether to generate a print-ready PDF or an HTML page"
        fullWidth
        input={
          <TextField
            select
            fullWidth
            label="Print format"
            variant="filled"
            value={options.format}
            onChange={(e) => {
              onChange({ format: e.target.value as PrintingFormat });
            }}
          >
            {PRINTING_FORMATS.map((format) => (
              <MenuItem key={format} value={format}>
                {format.toUpperCase()}
              </MenuItem>
            ))}
          </TextField>
        }
      />
    </>
  );
};

export default PrintOptionsForm;
