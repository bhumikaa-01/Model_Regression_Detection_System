import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function DeploymentCard({
  health,
  recommendation,
}) {
  let icon = <CheckCircleIcon sx={{ fontSize: 64 }} />;
  let color = "success";

  if (health.includes("Regression")) {
    icon = <ErrorIcon sx={{ fontSize: 64 }} />;
    color = "error";
  } else if (
    health.includes("No Significant Change")
  ) {
    icon = (
      <WarningAmberIcon sx={{ fontSize: 64 }} />
    );
    color = "warning";
  }

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        transition: "0.25s",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            "0px 12px 28px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
        >
          Deployment Status
        </Typography>

        <Stack
          alignItems="center"
          spacing={2}
          mt={4}
        >
          <Box color={`${color}.main`}>
            {icon}
          </Box>

          <Chip
            icon={<RocketLaunchIcon />}
            label={recommendation}
            color={color}
            size="medium"
          />
        </Stack>

        <Box mt={5}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Current Health
          </Typography>

          <Typography
            variant="h6"
            fontWeight={700}
            mt={1}
          >
            {health.replace(/🟢|🔴|🟡/g, "").trim()}
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
}