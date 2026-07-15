import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function RecentReportsTable({ reports }) {
    const navigate = useNavigate();

    function getChipColor(status) {
  if (status.includes("Improved")) return "success";

  if (status.includes("Regression")) return "error";

  return "warning";
}

  return (
    <Paper
      elevation={1}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
        Recent Reports
      </Typography>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell><b>Report</b></TableCell>
            <TableCell><b>Accuracy</b></TableCell>
            <TableCell><b>Health</b></TableCell>
            <TableCell><b>Prompt Version</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {reports.map((report) => (

            <TableRow key={report.report_id}>

              <TableCell>

    <Button
        size="small"
        onClick={() =>
            navigate(`/reports/${report.report_id}`)
        }
    >
        #{report.report_id}
    </Button>

</TableCell>

              <TableCell>
                {report.current_accuracy}%
              </TableCell>

              <TableCell>
                <Chip
                    label={report.health_status}
                    color={getChipColor(report.health_status)}
                />
              </TableCell>

              <TableCell>
                {report.prompt_version}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>
  );
}