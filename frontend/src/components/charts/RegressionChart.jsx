import {
  Paper,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function RegressionChart({ data }) {
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
        Regression Trend
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="report_id" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="regressions"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}