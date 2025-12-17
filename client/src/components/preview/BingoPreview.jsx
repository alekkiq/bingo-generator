import { Box, Paper, CircularProgress, Typography } from "@mui/material";
import { usePreview } from "../../hooks/usePreview";
import { defaultConfig } from "../../config/defaultConfig";

const BingoPreview = ({ game = defaultConfig.game }) => {
  const { html, loading, error } = usePreview(game);

  return (
    <Paper sx={{ height: "100%", overflow: "auto" }}>
      {loading && (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Typography color="error">Failed to load preview: {error}</Typography>
      )}

      {!loading && !error && html && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </Paper>
  );
};

export default BingoPreview;
