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
import { motion } from "framer-motion";

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
    if (seconds < 1) return `${Math.round(seconds * 1000)} ms`;
    return `${seconds.toFixed(2)} s`;
  };

  const getAccuracyColor = (accuracy = 0) => {
    if (accuracy >= 95) return "text-emerald-400";
    if (accuracy >= 80) return "text-yellow-400";
    return "text-red-400";
  };

  if (!reports.length) {
    return (
      <Card className="flex h-full flex-col items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] py-20">
        <FolderOpen
          size={54}
          className="mb-5 text-violet-400"
        />

        <h3 className="text-xl font-semibold text-white">
          No Reports Available
        </h3>

        <p className="mt-3 max-w-sm text-center text-sm text-[var(--text-secondary)]">
          Run your first evaluation to generate reports and monitor model quality over time.
        </p>
      </Card>
    );
  }

  return (
    <Card className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card-bg)]">

      {/* Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

      {/* Glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-white">
              Recent Reports
            </h2>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Latest evaluation runs
            </p>
          </div>

          <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-[var(--text-secondary)]">
            {reports.length} Reports
          </div>

        </div>

        {/* Reports */}

        <div className="space-y-5">

          {reports.map((report) => {

            const healthy =
              report.health_status?.includes("Improved") ||
              report.deployment_recommendation?.includes("Safe");

            return (

              <motion.div
                key={report.report_id}
                whileHover={{
                  y: -5,
                }}
                transition={{
                  duration: 0.2,
                }}
                role="button"
                tabIndex={0}
                onClick={() =>
                  navigate(`/reports/${report.report_id}`)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" ||
                    e.key === " "
                  ) {
                    navigate(
                      `/reports/${report.report_id}`
                    );
                  }
                }}
                className={`
                group/report
                cursor-pointer
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--bg-secondary)]
                p-6
                transition-all
                duration-300
                hover:border-violet-500/40
                hover:shadow-xl
                hover:shadow-violet-600/10
                `}
              >

                <div className="flex flex-col gap-8 xl:flex-row xl:justify-between">

                  {/* LEFT */}

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="text-lg font-semibold text-white">
                          Report #{report.report_id}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                          <CalendarDays size={14} />
                          {formatDateTime(report.timestamp)}
                        </div>

                      </div>

                      <div
                        className={`rounded-full px-4 py-2 text-xs font-semibold ${
                          healthy
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-red-500/15 text-red-300"
                        }`}
                      >
                        {healthy ? (
                          <CheckCircle2
                            size={14}
                            className="mr-1 inline"
                          />
                        ) : (
                          <AlertTriangle
                            size={14}
                            className="mr-1 inline"
                          />
                        )}

                        {(report.health_status || "")
                          .replace(
                            /^🟢\s*|^🟡\s*|^🔴\s*/,
                            ""
                          )}
                      </div>

                    </div>

                    {/* Metrics */}

                    <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">

                      <Metric
                        label="Accuracy"
                        icon={
                          <Target
                            size={16}
                            className={getAccuracyColor(
                              report.current_accuracy
                            )}
                          />
                        }
                        value={`${(
                          report.current_accuracy ?? 0
                        ).toFixed(2)}%`}
                        valueClass={getAccuracyColor(
                          report.current_accuracy
                        )}
                      />

                      <Metric
                        label="Execution"
                        icon={
                          <Clock3
                            size={16}
                            className="text-cyan-400"
                          />
                        }
                        value={formatExecutionTime(
                          report.execution_time_seconds
                        )}
                      />

                      <Metric
                        label="Test Cases"
                        icon={
                          <FileText
                            size={16}
                            className="text-violet-400"
                          />
                        }
                        value={
                          report.total_test_cases ?? 0
                        }
                      />

                      <Metric
                        label="Deployment"
                        value={
                          report.deployment_recommendation
                            ?.replace(/^✅\s*/, "") ??
                          "-"
                        }
                      />

                    </div>

                  </div>

                  {/* CTA */}

                  <div className="flex items-center">

                    <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/5 px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-all duration-300 group-hover/report:border-violet-500/40 group-hover/report:bg-violet-500/10 group-hover/report:text-white">

                      View Details

                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover/report:translate-x-1"
                      />

                    </div>

                  </div>

                </div>

              </motion.div>

            );
          })}

        </div>

      </div>

    </Card>
  );
}

function Metric({
  label,
  value,
  icon,
  valueClass = "text-white",
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </p>

      <div className="mt-3 flex items-center gap-2">
        {icon}

        <span className={`font-semibold ${valueClass}`}>
          {value}
        </span>
      </div>
    </div>
  );
}