import {
  PlayCircle,
  FileText,
  BarChart3,
  GitCompareArrows,
} from "lucide-react";

import Card from "../ui/Card";

const actions = [
  {
    title: "Run Evaluation",
    description: "Evaluate latest model",
    icon: PlayCircle,
    color: "text-blue-500",
  },
  {
    title: "View Reports",
    description: "Open evaluation reports",
    icon: FileText,
    color: "text-purple-500",
  },
  {
    title: "Analytics",
    description: "Inspect performance",
    icon: BarChart3,
    color: "text-green-500",
  },
  {
    title: "Compare Results",
    description: "Detect regressions",
    icon: GitCompareArrows,
    color: "text-orange-500",
  },
];

export default function QuickActions() {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-white">
        Quick Actions
      </h2>

      <div className="space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex w-full items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-blue-500 hover:bg-slate-800"
            >
              <div className={`rounded-lg bg-slate-800 p-3 ${action.color}`}>
                <Icon size={22} />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-white">
                  {action.title}
                </h3>

                <p className="text-sm text-slate-400">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}