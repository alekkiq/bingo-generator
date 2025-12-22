"use client";

import {
  Box,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  TextFieldProps,
} from "@mui/material";
import { Info } from "@mui/icons-material";

type LabeledInputProps = TextFieldProps & {
  label: string;
  tooltip?: string;
  input?: React.ReactNode;
};

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  tooltip,
  id,
  required,
  input,
  ...props
}) => {
  const inputId = id ?? `input-${label?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Box>
      <Box
        marginBlockEnd={0.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          component="label"
          htmlFor={inputId}
          variant="caption"
          fontWeight={500}
          className="text-neutral-600"
          sx={{ width: "100%" }}
          textTransform="uppercase"
        >
          {label}
          {required && " *"}
        </Typography>

        {tooltip && (
          <Tooltip title={tooltip} placement="left">
            <IconButton size="small" style={{ marginInlineEnd: "0.35rem" }}>
              <Info fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <>
        {input ?? (
          <TextField
            id={inputId}
            label={label}
            fullWidth
            required={required}
            {...props}
          />
        )}
      </>
    </Box>
  );
};

export default LabeledInput;
