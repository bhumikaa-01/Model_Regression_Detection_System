import {
  Target,
  TrendingUp,
  Clock3,
  ListChecks,
} from "lucide-react";

export default function ReportMetrics({ report }) {
  const deltaPositive = report.accuracy_delta >= 0;

  const metrics = [
    {
      title: "Previous Accuracy",
      value: `${report.previous_accuracy.toFixed(2)}%`,
      icon: Target,
      color: "text-slate-300",
    },
    {
      title: "Current Accuracy",
      value: `${report.current_accuracy.toFixed(2)}%`,
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      title: "Accuracy Delta",
      value: `${deltaPositive ? "+" : ""}${report.accuracy_delta.toFixed(2)}%`,
      icon: TrendingUp,
      color: deltaPositive ? "text-emerald-400" : "text-red-400",
    },
    {
      title: "Execution Time",
      value: `${report.execution_time_seconds.toFixed(2)} s`,
      icon: Clock3,
      color: "text-blue-400",
    },
    {
      title: "Total Test Cases",
      value: report.total_test_cases,
      icon: ListChecks,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-all duration-300 hover:border-blue-500/40"
          >
            <div className="flex items-center justify-between">
              <Icon className={metric.color} size={24} />

              <span className="text-xs uppercase tracking-wider text-slate-500">
                Metric
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold text-white">
              {metric.value}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {metric.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}