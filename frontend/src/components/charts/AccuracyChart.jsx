import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

export default function AccuracyChart({ accuracy }) {

  // Create the chart data AFTER receiving the prop
  const data = [
    {
      run: "Previous",
      accuracy: Math.max(0, accuracy - 20),
    },
    {
      run: "Current",
      accuracy: accuracy,
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          Accuracy Trend
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={280}
        >
          <LineChart data={data}>
            <XAxis dataKey="run" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#6366F1"
              strokeWidth={4}
            />

          </LineChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}