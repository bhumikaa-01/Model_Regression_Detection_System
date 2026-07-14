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
import ErrorIcon from "@mui/icons-material/Error";

export default function StillFailingTable({ stillFailing }) {
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
  <ErrorIcon color="warning" />

  <Typography
    variant="h6"
    fontWeight={700}
  >
    Still Failing ({stillFailing.length})
  </Typography>
</Box>
      </Typography>

      {stillFailing.length === 0 ? (
        <Typography
          color="success.main"
          fontWeight={500}
        >
          No failing test cases.
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
                <b>Prediction</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stillFailing.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>

                <TableCell>{item.expected}</TableCell>

                <TableCell>{item.current_prediction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}