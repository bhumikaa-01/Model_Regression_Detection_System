import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "../ui/Card";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl">
      <p className="text-sm font-medium text-white">
        Report #{payload[0].payload.report_id}
      </p>

      <p className="mt-1 text-sm text-blue-400">
        Accuracy{" "}
        <span className="font-semibold">
          {payload[0].value}%
        </span>
      </p>
    </div>
  );
}

export default function AccuracyChart({ data = [] }) {
  const latestAccuracy =
    data.length > 0
      ? data[data.length - 1].accuracy
      : 0;

  const previousAccuracy =
    data.length > 1
      ? data[data.length - 2].accuracy
      : latestAccuracy;

  const delta = (
    latestAccuracy - previousAccuracy
  ).toFixed(1);

  return (
    <Card className="h-[400px]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Accuracy Trend
          </h2>

          <p className="text-sm text-slate-400">
            Model performance over recent evaluations
          </p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-white">
            {latestAccuracy}%
          </p>

          <p
            className={`text-sm ${
              delta >= 0
                ? "text-emerald-400"
                : "text-red-400"
            }`}
          >
            {delta >= 0 ? "+" : ""}
            {delta}% from previous run
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="82%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="accuracyGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#3B82F6"
                stopOpacity={0.35}
              />

              <stop
                offset="95%"
                stopColor="#3B82F6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#1e293b"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="report_id"
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[0, 100]}
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#3B82F6",
              strokeDasharray: "3 3",
            }}
          />

          <Area
            type="monotone"
            dataKey="accuracy"
            stroke="none"
            fill="url(#accuracyGradient)"
          />

          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#3B82F6",
            }}
            activeDot={{
              r: 7,
              fill: "#fff",
              stroke: "#3B82F6",
              strokeWidth: 3,
            }}
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}