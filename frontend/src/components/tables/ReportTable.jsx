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
} from "@mui/material";

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
          p: 6,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          No Reports Found
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Try changing the search or filters.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>

        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "action.hover",
            }}
          >
            <TableCell>
              <Typography fontWeight={700}>
                Report ID
              </Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight={700}>
                Model
              </Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight={700}>
                Accuracy
              </Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight={700}>
                Health
              </Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight={700}>
                Date
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography fontWeight={700}>
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {reports.map((report) => (
            <TableRow
              key={report.report_id}
              hover
              sx={{
                transition: "0.2s",

                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <TableCell>
                #{report.report_id}
              </TableCell>

              <TableCell>
                {report.model}
              </TableCell>

              <TableCell>
                <Typography
                  fontWeight={600}
                >
                  {report.current_accuracy}%
                </Typography>
              </TableCell>

              <TableCell>
                <Chip
                  label={report.health_status}
                  color={getChipColor(report.health_status)}
                  size="small"
                />
              </TableCell>

              <TableCell>
                {new Date(
                  report.timestamp
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>

              <TableCell align="center">
                <Button
                  variant="contained"
                  size="small"
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