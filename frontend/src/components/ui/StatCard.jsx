import { motion } from "framer-motion";
import Card from "./Card";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-blue-500",
  change,
  trend = "up",
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-white">
              {value}
            </h2>

            {change && (
              <div
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  trend === "up"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {change}
              </div>
            )}
          </div>

          <div
            className={`rounded-2xl bg-slate-800 p-4 ${color}`}
          >
            <Icon size={28} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}