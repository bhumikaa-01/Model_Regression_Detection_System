import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Clock3,
} from "lucide-react";

import Card from "./Card";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-blue-500",
  change,
  trend = "up",
}) {
  const TrendIcon =
    trend === "up" ? TrendingUp : TrendingDown;

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Card className="relative h-full overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950">
        {/* Background Glow */}
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl" />

        <div className="relative flex h-full flex-col justify-between">
          {/* Top */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium tracking-wide text-slate-400">
                {title}
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
                {value}
              </h2>
            </div>

            <div
              className={`rounded-2xl bg-slate-800/80 p-4 ${color}`}
            >
              <Icon size={28} />
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-6 space-y-3">
            {change && (
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  trend === "up"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                <TrendIcon size={14} />
                {change}
                <span className="text-slate-400">
                  vs last run
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock3 size={14} />
              Updated 2 mins ago
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}