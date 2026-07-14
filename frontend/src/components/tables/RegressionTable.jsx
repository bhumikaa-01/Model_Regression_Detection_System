import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { Box } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function RegressionTable({ regressions }) {
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
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        <Box
  display="flex"
  alignItems="center"
  gap={1}
  mb={3}
>
  <TrendingDownIcon color="error" />

  <Typography
    variant="h6"
    fontWeight={700}
  >
    Regressions ({regressions.length})
  </Typography>
</Box>
      </Typography>

      {regressions.length === 0 ? (
        <Typography
          color="success.main"
          fontWeight={500}
        >
          No regressions detected.
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
            {regressions.map((item) => (
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