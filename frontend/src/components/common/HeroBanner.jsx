import {
  Paper,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
} from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 4, md: 6 },
        borderRadius: 5,
        background:
          "linear-gradient(135deg,#F8FBFF 0%, #EEF6FF 100%)",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <Stack spacing={3}>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
        >
          <Chip
            icon={<VerifiedIcon />}
            label="Production Ready"
            color="success"
          />

          <Chip
            icon={<AssessmentIcon />}
            label="Regression Detection"
            color="primary"
          />

          <Chip
            icon={<AutoGraphIcon />}
            label="LLM Evaluation"
            color="secondary"
          />
        </Stack>

        <Box>
          <Typography
            variant="overline"
            color="primary"
            fontWeight={700}
          >
            LLM REGRESSION DETECTION PLATFORM
          </Typography>

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              mt: 1,
              fontSize: {
                xs: "2.2rem",
                md: "3.4rem",
              },
              lineHeight: 1.15,
            }}
          >
            Monitor AI Models.
            <br />
            Detect Regressions.
            <br />
            Deploy with Confidence.
          </Typography>

          <Typography
            sx={{
              mt: 3,
              maxWidth: 760,
              color: "text.secondary",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            Continuously evaluate Large Language Models,
            compare historical runs, detect regressions,
            visualize performance trends and prevent
            quality degradation before deployment.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/reports")}
            sx={{
              px: 5,
              py: 1.4,
              borderRadius: 3,
            }}
          >
            View Reports
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/analytics")}
            sx={{
              px: 5,
              py: 1.4,
              borderRadius: 3,
            }}
          >
            View Analytics
          </Button>
        </Stack>

      </Stack>
    </Paper>
  );
}