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
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="text-sm font-semibold text-white">
        Report #{payload[0].payload.report_id}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-violet-500"></div>

        <p className="text-sm text-[var(--text-secondary)]">
          Accuracy
          <span className="ml-2 font-bold text-violet-300">
            {payload[0].value}%
          </span>
        </p>
      </div>
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
    <Card
      className="
        group
        relative
        h-[420px]
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--card-bg)]
        transition-all
        duration-300
        hover:border-violet-500/30
      "
    >
      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

      {/* Glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

      <div className="relative z-10">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-white">
              Accuracy Trend
            </h2>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Model performance across recent evaluation runs
            </p>

          </div>

          <div className="text-right">

            <p className="text-4xl font-bold text-white">
              {latestAccuracy}%
            </p>

            <p
              className={`text-sm font-medium ${
                delta >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {delta >= 0 ? "+" : ""}
              {delta}% since previous run
            </p>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height="82%"
        >
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
                  stopColor="#8B5CF6"
                  stopOpacity={0.40}
                />

                <stop
                  offset="95%"
                  stopColor="#8B5CF6"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#262D3D"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="report_id"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#A8B3CF",
                fontSize: 12,
              }}
            />

            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#A8B3CF",
                fontSize: 12,
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#8B5CF6",
                strokeDasharray: "5 5",
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
              stroke="#8B5CF6"
              strokeWidth={3.5}
              dot={{
                r: 4,
                fill: "#8B5CF6",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                fill: "#ffffff",
                stroke: "#8B5CF6",
                strokeWidth: 4,
              }}
              animationDuration={1200}
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>
    </Card>
  );
}