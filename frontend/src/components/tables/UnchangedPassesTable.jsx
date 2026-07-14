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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function UnchangedPassesTable({ unchangedPasses }) {
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
  <CheckCircleIcon color="success" />

  <Typography
    variant="h6"
    fontWeight={700}
  >
    Unchanged Passes ({unchangedPasses.length})
  </Typography>
</Box>
      </Typography>

      {unchangedPasses.length === 0 ? (
        <Typography
          color="text.secondary"
          fontWeight={500}
        >
          No unchanged passes found.
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
            {unchangedPasses.map((item) => (
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