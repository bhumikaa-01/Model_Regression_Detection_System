import { useState } from "react";
import toast from "react-hot-toast";

import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { runEvaluation } from "../../services/api";

export default function RunEvaluation() {
  const [model, setModel] = useState("gemini-2.5-flash");
  const [promptVersion, setPromptVersion] = useState("v1");
  const [dataset, setDataset] = useState("golden_dataset_dev.json");

  const [loading, setLoading] = useState(false);

  const handleRunEvaluation = async () => {
    if (loading) return;

    console.log("🚀 Run Evaluation clicked");

    try {
      setLoading(true);

      const response = await runEvaluation({
        model,
        prompt_version: promptVersion,
        dataset,
      });

      console.log("✅ Evaluation Response:", response);

      toast.success(response.message);
    } catch (error) {
      console.error("❌ Evaluation Error:", error);
      toast.error("Failed to run evaluation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Run Evaluation
      </Typography>

      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          maxWidth: 700,
        }}
      >
        <Stack spacing={3}>
          <TextField
            select
            label="Model"
            fullWidth
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <MenuItem value="gemini-2.5-flash">
              Gemini 2.5 Flash
            </MenuItem>

            <MenuItem value="gpt-4.1">
              GPT-4.1
            </MenuItem>

            <MenuItem value="claude-sonnet">
              Claude Sonnet
            </MenuItem>
          </TextField>

          <TextField
            select
            label="Prompt Version"
            fullWidth
            value={promptVersion}
            onChange={(e) => setPromptVersion(e.target.value)}
          >
            <MenuItem value="v1">v1</MenuItem>
            <MenuItem value="v2">v2</MenuItem>
            <MenuItem value="v3">v3</MenuItem>
          </TextField>

          <TextField
            select
            label="Dataset"
            fullWidth
            value={dataset}
            onChange={(e) => setDataset(e.target.value)}
          >
            <MenuItem value="golden_dataset_dev.json">
              Development Dataset (5 Emails)
            </MenuItem>

            <MenuItem value="golden_dataset_v1.json">
              Production Dataset (24 Emails)
            </MenuItem>
          </TextField>

          <Button
            variant="contained"
            size="large"
            startIcon={
              loading ? (
                <CircularProgress
                  size={20}
                  color="inherit"
                />
              ) : (
                <PlayArrowIcon />
              )
            }
            disabled={loading}
            onClick={handleRunEvaluation}
          >
            {loading
              ? "Running Evaluation..."
              : "Run Evaluation"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}