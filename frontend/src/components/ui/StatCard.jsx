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
  color = "text-violet-400",
  change,
  trend = "up",
}) {
  const TrendIcon =
    trend === "up" ? TrendingUp : TrendingDown;

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="h-full"
    >
      <Card
        className="
          group
          relative
          h-full
          overflow-hidden
          rounded-3xl
          border
          border-[var(--border)]
          bg-[var(--card-bg)]
          transition-all
          duration-300
          hover:border-violet-500/40
          hover:shadow-2xl
          hover:shadow-violet-600/10
        "
      >
        {/* Top Gradient Accent */}
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

        {/* Background Glow */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,#ffffff_1px,transparent_1px)] bg-[length:18px_18px]" />
        </div>

        <div className="relative flex h-full flex-col justify-between p-1">

          {/* Top */}
          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                {title}
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
                {value}
              </h2>

            </div>

            <div
              className="
                rounded-2xl
                border
                border-violet-500/20
                bg-gradient-to-br
                from-violet-600/20
                via-purple-600/15
                to-fuchsia-600/20
                p-4
                shadow-lg
                shadow-violet-500/10
                transition-all
                duration-300
                group-hover:scale-110
              "
            >
              <Icon
                size={28}
                className={color}
              />
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-8 space-y-4">

            {change && (
              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${
                  trend === "up"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-red-500/15 text-red-300"
                }`}
              >
                <TrendIcon size={14} />

                <span>{change}</span>

                <span className="text-[var(--text-muted)]">
                  vs last run
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Clock3 size={14} />

              Updated 2 mins ago
            </div>

          </div>

        </div>
      </Card>
    </motion.div>
  );
}