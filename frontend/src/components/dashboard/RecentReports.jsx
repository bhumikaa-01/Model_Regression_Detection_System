import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

import Card from "../ui/Card";

export default function RecentReports({ reports = [] }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="h-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Reports
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest evaluation runs
          </p>
        </div>

        <button className="text-sm font-medium text-blue-400 transition hover:text-blue-300">
          View All
        </button>
      </div>

      {/* Table Header */}
      <div className="mb-3 grid grid-cols-4 border-b border-slate-800 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <span>Report</span>
        <span>Accuracy</span>
        <span>Status</span>
        <span className="text-right">Action</span>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {reports.map((report) => {
          const healthy =
            report.health_status.includes("Improved") ||
            report.deployment_recommendation.includes("Safe");

          return (
            <div
              key={report.report_id}
              className="grid grid-cols-4 items-center rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900"
            >
              {/* Report */}
              <div>
                <p className="font-semibold text-white">
                  #{report.report_id}
                </p>

                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <CalendarDays size={12} />
                  {formatDate(report.timestamp)}
                </div>
              </div>

              {/* Accuracy */}
              <div className="text-sm font-semibold text-white">
                {report.current_accuracy}%
              </div>

              {/* Health */}
              <div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    healthy
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {healthy ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <AlertTriangle size={14} />
                  )}

                  {report.health_status.replace(
                    /^🟢\s*|^🟡\s*|^🔴\s*/,
                    ""
                  )}
                </span>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}