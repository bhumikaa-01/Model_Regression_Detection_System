import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function ReportsTable({ reports }) {
  const navigate = useNavigate();

  const getChipColor = (status) => {
    if (status.includes("Improved")) return "success";
    if (status.includes("Regression")) return "error";
    return "warning";
  };

  if (reports.length === 0) {
    return (
      <Paper
        sx={{
          mt: 4,
          p: 8,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          No Reports Found
        </Typography>

        <Typography
          mt={2}
          color="text.secondary"
        >
          No evaluation reports match your current filters.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 4,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <Table>

        {/* Header */}

        <TableHead>

          <TableRow
            sx={{
              backgroundColor: "action.hover",

              "& th": {
                fontWeight: 700,
                fontSize: 15,
              },
            }}
          >
            <TableCell>Report ID</TableCell>
            <TableCell>Model</TableCell>
            <TableCell width={220}>
              Accuracy
            </TableCell>
            <TableCell>Health</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">
              Action
            </TableCell>
          </TableRow>

        </TableHead>

        <TableBody>

          {reports.map((report) => (

            <TableRow
              key={report.report_id}
              hover
              sx={{
                transition: ".25s",

                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {/* Report ID */}

              <TableCell>

                <Chip
                  label={`#${report.report_id}`}
                  color="primary"
                  size="small"
                />

              </TableCell>

              {/* Model */}

              <TableCell>

                <Typography
                  fontWeight={600}
                >
                  {report.model}
                </Typography>

              </TableCell>

              {/* Accuracy */}

              <TableCell>

                <Typography
                  fontWeight={700}
                  mb={0.5}
                >
                  {report.current_accuracy}%
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={report.current_accuracy}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                  }}
                />

              </TableCell>

              {/* Health */}

              <TableCell>

                <Chip
                  label={report.health_status}
                  color={getChipColor(report.health_status)}
                  size="small"
                />

              </TableCell>

              {/* Date */}

              <TableCell>

                {new Date(
                  report.timestamp
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}

              </TableCell>

              {/* Button */}

              <TableCell align="center">

                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() =>
                    navigate(
                      `/reports/${report.report_id}`
                    )
                  }
                >
                  View
                </Button>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
}