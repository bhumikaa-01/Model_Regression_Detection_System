import {
  PlayCircle,
  FileText,
  BarChart3,
  GitCompareArrows,
  ArrowUpRight,
} from "lucide-react";

import Card from "../ui/Card";

const actions = [
  {
    title: "Run Evaluation",
    description: "Evaluate your latest LLM version",
    icon: PlayCircle,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "View Reports",
    description: "Browse historical evaluation reports",
    icon: FileText,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    title: "Analytics",
    description: "Monitor trends and performance",
    icon: BarChart3,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Compare Results",
    description: "Detect regressions between model versions",
    icon: GitCompareArrows,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

export default function QuickActions() {
  return (
    <Card className="h-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Frequently used operations
        </p>
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="group flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-xl p-3 ${action.bg} ${action.color}`}
                >
                  <Icon size={22} />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold text-white">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={18}
                className="text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
              />
            </button>
          );
        })}
      </div>
    </Card>
  );
}