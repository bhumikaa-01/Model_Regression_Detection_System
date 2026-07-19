import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import Card from "../ui/Card";

const data = [
  { name: "Healthy", value: 88 },
  { name: "Warning", value: 9 },
  { name: "Critical", value: 3 },
];

const COLORS = [
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

export default function HealthChart() {
  return (
    <Card className="h-[380px]">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Model Health
        </h2>

        <p className="text-sm text-slate-400">
          Overall evaluation health
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={70}
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}