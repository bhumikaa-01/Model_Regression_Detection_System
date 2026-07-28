import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import Card from "../ui/Card";

const COLOR_MAP = {
  "🟢 Model Improved": "#22C55E",
  "🟡 Stable": "#F59E0B",
  "🔴 Model Regressed": "#EF4444",
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="font-semibold text-white">
        {payload[0].name.replace(
          /^🟢\s*|^🟡\s*|^🔴\s*/,
          ""
        )}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <div
          className="h-2.5 w-2.5 rounded-full"
          style={{
            backgroundColor:
              COLOR_MAP[payload[0].name] ??
              "#64748B",
          }}
        />

        <span className="text-sm text-[var(--text-secondary)]">
          {payload[0].value} evaluations
        </span>
      </div>
    </div>
  );
}

export default function HealthChart({
  data = {},
}) {
  const chartData = Object.entries(data).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const total = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

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
      {/* Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

      {/* Glow */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

      <div className="relative z-10">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-white">
              Model Health
            </h2>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Distribution of evaluation outcomes
            </p>
          </div>

          <div className="text-right">

            <p className="text-3xl font-bold text-white">
              {total}
            </p>

            <p className="text-sm text-[var(--text-muted)]">
              Total Evaluations
            </p>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height="58%"
        >
          <PieChart>

            <Pie
              data={chartData}
              innerRadius={78}
              outerRadius={112}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              animationDuration={1200}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={
                    COLOR_MAP[entry.name] ??
                    "#64748B"
                  }
                />
              ))}
            </Pie>

            <Tooltip
              content={<CustomTooltip />}
            />

          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}

        <div className="mt-6 space-y-3">

          {chartData.map((item) => (

            <div
              key={item.name}
              className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2 transition-all duration-300 hover:border-[var(--border)] hover:bg-white/[0.03]"
            >

              <div className="flex items-center gap-3">

                <span
                  className="h-3.5 w-3.5 rounded-full shadow-md"
                  style={{
                    backgroundColor:
                      COLOR_MAP[item.name] ??
                      "#64748B",
                  }}
                />

                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  {item.name.replace(
                    /^🟢\s*|^🟡\s*|^🔴\s*/,
                    ""
                  )}
                </span>

              </div>

              <div className="flex items-center gap-3">

                <span className="text-sm font-semibold text-white">
                  {item.value}
                </span>

                <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-[var(--text-muted)]">
                  {total
                    ? Math.round(
                        (item.value / total) *
                          100
                      )
                    : 0}
                  %
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </Card>
  );
}