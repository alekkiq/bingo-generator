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
};

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  tooltip,
  id,
  required,
  ...props
}) => {
  const inputId = id ?? `input-${label?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          component="label"
          htmlFor={inputId}
          variant="caption"
          fontWeight={500}
          className="text-neutral-600"
          textTransform="uppercase"
        >
          {label}
          {required && " *"}
        </Typography>

        {tooltip && (
          <Tooltip title={tooltip} placement="left">
            <IconButton size="small">
              <Info fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <TextField
        id={inputId}
        label={label}
        fullWidth
        required={required}
        {...props}
      />
    </Box>
  );
};

export default LabeledInput;
