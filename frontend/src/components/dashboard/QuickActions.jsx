import {
  PlayCircle,
  FileText,
  BarChart3,
  GitCompareArrows,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

import Card from "../ui/Card";

const actions = [
  {
    title: "Run Evaluation",
    description: "Evaluate your latest LLM version",
    icon: PlayCircle,
    color: "text-violet-300",
    bg: "from-violet-600/20 via-purple-600/20 to-fuchsia-600/20",
  },
  {
    title: "View Reports",
    description: "Browse historical evaluation reports",
    icon: FileText,
    color: "text-sky-300",
    bg: "from-sky-500/20 to-cyan-500/20",
  },
  {
    title: "Analytics",
    description: "Monitor trends and performance",
    icon: BarChart3,
    color: "text-emerald-300",
    bg: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Compare Results",
    description: "Detect regressions between model versions",
    icon: GitCompareArrows,
    color: "text-amber-300",
    bg: "from-amber-500/20 to-orange-500/20",
  },
];

export default function QuickActions() {
  return (
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
      "
    >
      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

      {/* Glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">

        {/* Header */}

        <div className="mb-8">

          <h2 className="text-xl font-bold text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Frequently used operations
          </p>

        </div>

        <div className="space-y-4">

          {actions.map((action) => {

            const Icon = action.icon;

            return (
              <motion.button
                key={action.title}
                whileHover={{
                  x: 4,
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group/action
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--bg-secondary)]
                  p-4
                  transition-all
                  duration-300
                  hover:border-violet-500/30
                  hover:bg-white/[0.03]
                  hover:shadow-lg
                  hover:shadow-violet-500/10
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${action.bg}
                    `}
                  >
                    <Icon
                      size={24}
                      className={action.color}
                    />
                  </div>

                  <div className="text-left">

                    <h3 className="font-semibold text-white">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {action.description}
                    </p>

                  </div>

                </div>

                <ArrowUpRight
                  size={20}
                  className="
                    text-[var(--text-muted)]
                    transition-all
                    duration-300
                    group-hover/action:-translate-y-1
                    group-hover/action:translate-x-1
                    group-hover/action:text-violet-300
                  "
                />

              </motion.button>
            );
          })}

        </div>

      </div>

    </Card>
  );
}