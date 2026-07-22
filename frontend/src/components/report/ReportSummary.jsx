import {
  ShieldCheck,
  Rocket,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function ReportSummary({ report }) {
  const healthy =
    report.health_status.includes("Improved") ||
    report.deployment_recommendation.includes("Safe");

  const summaryCards = [
    {
      title: "Regressions",
      value: report.regressions.length,
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Improvements",
      value: report.improvements.length,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Still Passing",
      value: report.unchanged_passes.length,
      icon: CheckCircle2,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Still Failing",
      value: report.still_failing.length,
      icon: XCircle,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Health + Deployment */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck
              className={
                healthy ? "text-emerald-400" : "text-red-400"
              }
              size={28}
            />

            <div>
              <h3 className="text-lg font-semibold text-white">
                Health Status
              </h3>

              <p className="mt-1 text-slate-400">
                {report.health_status.replace(
                  /^🟢\s*|^🟡\s*|^🔴\s*/,
                  ""
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3">
            <Rocket
              className={
                healthy ? "text-blue-400" : "text-red-400"
              }
              size={28}
            />

            <div>
              <h3 className="text-lg font-semibold text-white">
                Deployment Recommendation
              </h3>

              <p className="mt-1 text-slate-400">
                {report.deployment_recommendation.replace(
                  /^✅\s*|^⚠️\s*|^❌\s*/,
                  ""
                )}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div
                className={`inline-flex rounded-xl p-3 ${card.bg}`}
              >
                <Icon
                  className={card.color}
                  size={22}
                />
              </div>

              <p className="mt-6 text-4xl font-bold text-white">
                {card.value}
              </p>

              <p className="mt-2 text-slate-400">
                {card.title}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}