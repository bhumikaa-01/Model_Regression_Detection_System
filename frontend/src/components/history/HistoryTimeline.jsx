import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import HistoryIcon from "@mui/icons-material/History";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { useNavigate } from "react-router-dom";

export default function HistoryTimeline({ reports }) {
  const navigate = useNavigate();

 return (
  <Stack spacing={3}>
    {reports.map((report) => (
      <Card
        key={report.report_id}
        elevation={2}
        sx={{
          borderRadius: 4,
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 8,
          },
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <HistoryIcon color="primary" />

              <Typography
                variant="h6"
                fontWeight={700}
              >
                Report #{report.report_id}
              </Typography>
            </Stack>

            <Button
              variant="contained"
              onClick={() =>
                navigate(`/reports/${report.report_id}`)
              }
            >
              View Report
            </Button>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1}>
            <Typography>
              <strong>Date:</strong>{" "}
              {new Date(report.timestamp).toLocaleString()}
            </Typography>

            <Typography>
              <strong>Model:</strong> {report.model}
            </Typography>

            <Typography>
              <strong>Prompt:</strong> {report.prompt_name}
            </Typography>

            <Typography>
              <strong>Dataset:</strong> {report.dataset_name}
            </Typography>

            <Typography>
              <strong>Accuracy:</strong>{" "}
              {report.current_accuracy}%
            </Typography>
          </Stack>

          <Box mt={3}>
            <Chip
              icon={
                report.health_status.includes("Improved") ? (
                  <TrendingUpIcon />
                ) : report.health_status.includes("Regression") ? (
                  <ErrorIcon />
                ) : (
                  <CheckCircleIcon />
                )
              }
              label={report.health_status}
              color={
                report.health_status.includes("Improved")
                  ? "success"
                  : report.health_status.includes("Regression")
                  ? "error"
                  : "warning"
              }
            />
          </Box>
        </CardContent>
      </Card>
    ))}
  </Stack>
);
}