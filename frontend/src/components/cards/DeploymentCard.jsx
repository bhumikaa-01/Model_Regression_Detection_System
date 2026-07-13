import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

export default function DeploymentCard({
  health,
  recommendation,
}) {
  let statusIcon = "🟢";
  let chipColor = "success";

  if (health === "Regression Detected") {
    statusIcon = "🔴";
    chipColor = "error";
  } else if (health === "Model Unchanged") {
    statusIcon = "🟡";
    chipColor = "warning";
  }

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Deployment Status
        </Typography>

        <Typography
          mt={3}
          variant="h2"
        >
          {statusIcon}
        </Typography>

        <Typography
          mt={2}
          variant="h5"
          fontWeight={700}
        >
          {recommendation}
        </Typography>

        <Typography
          mt={2}
          color="text.secondary"
          variant="body2"
        >
          Current Health
        </Typography>

        <Typography
          variant="body1"
          fontWeight={600}
        >
          {health}
        </Typography>

        <Chip
          sx={{ mt: 4 }}
          color={chipColor}
          label={recommendation}
        />
      </CardContent>
    </Card>
  );
}