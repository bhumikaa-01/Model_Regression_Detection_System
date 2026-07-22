import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  Target,
  Clock3,
  FileText,
  FolderOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";

export default function RecentReports({ reports = [] }) {
  const navigate = useNavigate();

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "Unknown";

    return new Date(timestamp).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatExecutionTime = (seconds = 0) => {
    if (seconds < 1) {
      return `${Math.round(seconds * 1000)} ms`;
    }

    return `${seconds.toFixed(2)} s`;
  };

  const getAccuracyColor = (accuracy = 0) => {
    if (accuracy >= 95) return "text-emerald-400";
    if (accuracy >= 80) return "text-yellow-400";
    return "text-red-400";
  };

  if (reports.length === 0) {
    return (
      <Card className="flex h-full flex-col items-center justify-center py-16 text-center">
        <FolderOpen
          size={48}
          className="mb-4 text-slate-600"
        />

        <h3 className="text-lg font-semibold text-white">
          No Reports Available
        </h3>

        <p className="mt-2 max-w-sm text-sm text-slate-400">
          Run your first evaluation to generate a report. Your latest
          evaluation runs will appear here.
        </p>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white">
          Recent Reports
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Latest evaluation runs
        </p>
      </div>

      {/* Reports */}
      <div className="space-y-4">
        {reports.map((report) => {
          const healthy =
            report.health_status?.includes("Improved") ||
            report.deployment_recommendation?.includes("Safe");

          return (
            <div
              key={report.report_id}
              role="button"
              tabIndex={0}
              aria-label={`View Report ${report.report_id}`}
              onClick={() =>
                navigate(`/reports/${report.report_id}`)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(`/reports/${report.report_id}`);
                }
              }}
              className={`group cursor-pointer rounded-2xl border border-slate-800 border-l-4 bg-slate-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900 hover:shadow-xl hover:shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                healthy
                  ? "border-l-emerald-500"
                  : "border-l-red-500"
              }`}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                {/* Left */}
                <div className="flex-1">
                  {/* Title */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Report #{report.report_id}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={14} />
                      {formatDateTime(report.timestamp)}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {/* Accuracy */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Accuracy
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <Target
                          size={16}
                          className={getAccuracyColor(
                            report.current_accuracy
                          )}
                        />

                        <span
                          className={`text-lg font-bold ${getAccuracyColor(
                            report.current_accuracy
                          )}`}
                        >
                          {(report.current_accuracy ?? 0).toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    {/* Health */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Health
                      </p>

                      <div className="mt-2">
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

                          {(report.health_status || "Unknown").replace(
                            /^🟢\s*|^🟡\s*|^🔴\s*/,
                            ""
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Execution */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Execution
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <Clock3
                          size={16}
                          className="text-cyan-400"
                        />

                        <span className="font-semibold text-white">
                          {formatExecutionTime(
                            report.execution_time_seconds
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Test Cases */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Test Cases
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <FileText
                          size={16}
                          className="text-violet-400"
                        />

                        <span className="font-semibold text-white">
                          {report.total_test_cases ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center self-end lg:self-center">
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-all duration-300 group-hover:bg-slate-800 group-hover:text-white">
                    <span className="hidden md:block">
                      View Details
                    </span>

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}