import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function ImprovementTable({ improvements }) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 5,
        p: 4,
        borderRadius: 4,
        border: "1px solid #ECECEC",
      }}
    >
      <Box
  display="flex"
  alignItems="center"
  gap={1}
  mb={3}
>
  <TrendingUpIcon color="primary" />

  <Typography
    variant="h6"
    fontWeight={700}
  >
    Improvements ({improvements.length})
  </Typography>
</Box>

      {improvements.length === 0 ? (
        <Typography
          color="success.main"
          fontWeight={500}
        >
          No improvements found.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Email ID</b>
              </TableCell>

              <TableCell>
                <b>Expected</b>
              </TableCell>

              <TableCell>
                <b>Previous Prediction</b>
              </TableCell>

              <TableCell>
                <b>Current Prediction</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {improvements.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>

                <TableCell>{item.expected}</TableCell>

                <TableCell>
                  {item.previous_prediction ?? "-"}
                </TableCell>

                <TableCell>
                  {item.current_prediction}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}