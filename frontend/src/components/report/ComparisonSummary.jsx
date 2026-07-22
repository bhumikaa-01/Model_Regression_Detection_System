import {
  Target,
  TrendingUp,
  TrendingDown,
  Clock3,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import Card from "../ui/Card";

export default function ComparisonSummary({
  leftReport,
  rightReport,
}) {
  if (!leftReport || !rightReport) return null;

  const accuracyDiff =
    leftReport.current_accuracy - rightReport.current_accuracy;

  const executionDiff =
    leftReport.execution_time_seconds -
    rightReport.execution_time_seconds;

  const betterAccuracy = accuracyDiff >= 0;

  const fasterExecution = executionDiff <= 0;

  const metricCard = (
    title,
    value,
    subtitle,
    icon,
    accent = "blue"
  ) => {
    const colors = {
      blue: "border-blue-500/30 bg-blue-500/5",
      green: "border-emerald-500/30 bg-emerald-500/5",
      red: "border-red-500/30 bg-red-500/5",
      yellow: "border-yellow-500/30 bg-yellow-500/5",
      cyan: "border-cyan-500/30 bg-cyan-500/5",
      purple: "border-violet-500/30 bg-violet-500/5",
    };

    return (
      <Card className={`border ${colors[accent]} p-5`}>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          {icon}
        </div>

        <h3 className="text-3xl font-bold text-white">
          {value}
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          {subtitle}
        </p>
      </Card>
    );
  };

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {metricCard(
        "Accuracy Difference",
        `${accuracyDiff >= 0 ? "+" : ""}${accuracyDiff.toFixed(
          2
        )}%`,
        `${leftReport.current_accuracy.toFixed(
          2
        )}% vs ${rightReport.current_accuracy.toFixed(2)}%`,
        betterAccuracy ? (
          <TrendingUp className="text-emerald-400" />
        ) : (
          <TrendingDown className="text-red-400" />
        ),
        betterAccuracy ? "green" : "red"
      )}

      {metricCard(
        "Regressions",
        leftReport.regressions?.length ?? 0,
        "Prediction quality dropped",
        <AlertTriangle className="text-red-400" />,
        "red"
      )}

      {metricCard(
        "Improvements",
        leftReport.improvements?.length ?? 0,
        "Prediction quality improved",
        <CheckCircle2 className="text-emerald-400" />,
        "green"
      )}

      {metricCard(
        "Execution Time",
        `${leftReport.execution_time_seconds.toFixed(2)} s`,
        fasterExecution
          ? "Faster than previous"
          : "Slower than previous",
        <Clock3 className="text-cyan-400" />,
        "cyan"
      )}

      {metricCard(
        "Test Cases",
        leftReport.total_test_cases,
        "Evaluated prompts",
        <Target className="text-violet-400" />,
        "purple"
      )}

      {metricCard(
        "Deployment",
        leftReport.deployment_recommendation,
        leftReport.health_status,
        <CheckCircle2 className="text-blue-400" />,
        "blue"
      )}
    </div>
  );
}