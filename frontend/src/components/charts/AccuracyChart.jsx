import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "../ui/Card";

const data = [
  { day: "Mon", accuracy: 96.2 },
  { day: "Tue", accuracy: 96.8 },
  { day: "Wed", accuracy: 97.5 },
  { day: "Thu", accuracy: 97.9 },
  { day: "Fri", accuracy: 98.4 },
];

export default function AccuracyChart() {
  return (
    <Card className="h-[380px]">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Accuracy Trend
        </h2>

        <p className="text-sm text-slate-400">
          Model accuracy over recent evaluations
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
            stroke="#94A3B8"
          />

          <YAxis
            stroke="#94A3B8"
            domain={[95, 100]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#3B82F6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}