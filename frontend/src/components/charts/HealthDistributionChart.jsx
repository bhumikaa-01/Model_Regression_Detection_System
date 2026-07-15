import {
  Paper,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#4CAF50",
  "#FF9800",
  "#F44336",
  "#2196F3",
  "#9C27B0",
];

export default function HealthDistributionChart({
  data,
}) {
  const chartData = Object.entries(data).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

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
        Health Distribution
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}