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
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function ReportsTable({ reports }) {
  const navigate = useNavigate();

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 4,
        borderRadius: 3,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Report ID</b></TableCell>
            <TableCell><b>Model</b></TableCell>
            <TableCell><b>Accuracy</b></TableCell>
            <TableCell><b>Health</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.report_id}>
              <TableCell>{report.report_id}</TableCell>

              <TableCell>{report.model}</TableCell>

              <TableCell>{report.current_accuracy}%</TableCell>

              <TableCell>
                <Chip
                  label={report.health_status}
                  color="success"
                  size="small"
                />
              </TableCell>

              <TableCell>
                {new Date(report.timestamp).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <Button
  variant="contained"
  size="small"
  onClick={() => {
    console.log("Clicked", report.report_id);
    navigate(`/reports/${report.report_id}`);
  }}
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