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
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl">
      <p className="font-medium text-white">
        {payload[0].name.replace(
          /^🟢\s*|^🟡\s*|^🔴\s*/,
          ""
        )}
      </p>

      <p className="mt-1 text-sm text-slate-300">
        {payload[0].value} evaluations
      </p>
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

  return (
    <Card className="h-[400px]">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Model Health
        </h2>

        <p className="text-sm text-slate-400">
          Distribution of evaluation outcomes
        </p>
      </div>

      <ResponsiveContainer width="100%" height="62%">
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={75}
            outerRadius={105}
            paddingAngle={4}
            dataKey="value"
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

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-5 space-y-3">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    COLOR_MAP[item.name] ??
                    "#64748B",
                }}
              />

              <span className="text-sm text-slate-300">
                {item.name.replace(
                  /^🟢\s*|^🟡\s*|^🔴\s*/,
                  ""
                )}
              </span>
            </div>

            <span className="text-sm font-semibold text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}