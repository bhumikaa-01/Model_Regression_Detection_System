import { Paper, Typography, Button } from "@mui/material";

export default function HeroBanner() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        borderRadius: 5,
        background:
          "linear-gradient(135deg,#ffffff,#eef6ff)",
      }}
    >
      <Typography
        variant="overline"
        color="primary"
      >
        LLM REGRESSION DETECTION
      </Typography>

      <Typography
        variant="h2"
        fontWeight={800}
        sx={{ mt: 2 }}
      >
        Monitor AI Models.
        <br />
        Detect Regressions.
      </Typography>

      <Typography
        sx={{
          mt: 3,
          maxWidth: 700,
          color: "text.secondary",
        }}
      >
        Evaluate every LLM version,
        compare historical runs,
        visualize regressions,
        and prevent quality degradation
        before deployment.
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 4,
          px: 5,
          borderRadius: 4,
        }}
      >
        View Reports
      </Button>
    </Paper>
  );
}