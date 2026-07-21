import { useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  FileText,
  ShieldCheck,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/ui/StatCard";
import AccuracyChart from "../components/charts/AccuracyChart";
import HealthChart from "../components/charts/HealthChart";
import RecentReports from "../components/dashboard/RecentReports";
import QuickActions from "../components/dashboard/QuickActions";
import RunEvaluationModal from "../components/evaluation/RunEvaluationModal";

import {
  getAnalytics,
  runEvaluation,
} from "../services/api";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [runningEvaluation, setRunningEvaluation] =
    useState(false);

  /* ================= Fetch Dashboard ================= */

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const data = await getAnalytics();

      setAnalytics(data);
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  /* ================= Run Evaluation ================= */

  const handleRunEvaluation = async (payload) => {
    try {
      setRunningEvaluation(true);

      await runEvaluation(payload);

      await fetchAnalytics();

      setModalOpen(false);

      alert("Evaluation completed successfully!");
    } catch (error) {
      console.error(error);

      alert("Evaluation failed.");
    } finally {
      setRunningEvaluation(false);
    }
  };

  /* ================= Loading ================= */

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg text-slate-400">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg text-red-500">
          Failed to load dashboard.
        </p>
      </div>
    );
  }

  return (
    <>
      <RunEvaluationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRun={handleRunEvaluation}
        loading={runningEvaluation}
      />

      <div className="space-y-10">
        <PageHeader
          title="Dashboard"
          subtitle="Monitor your LLM evaluation metrics, regression history and model health."
          buttonText="Run Evaluation"
          onButtonClick={() => setModalOpen(true)}
        />

        {/* ===================== System Overview ===================== */}

        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              System Overview
            </h2>

            <p className="text-sm text-slate-400">
              Live performance snapshot of your AI evaluation
              platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Accuracy"
              value={`${analytics.summary.latest_accuracy}%`}
              icon={BarChart3}
              color="text-blue-500"
              change={`${analytics.summary.average_accuracy}% Avg`}
            />

            <StatCard
              title="Reports"
              value={analytics.summary.total_runs}
              icon={FileText}
              color="text-purple-500"
              change={`${analytics.summary.total_runs} Runs`}
            />

            <StatCard
              title="Regressions"
              value={analytics.summary.total_regressions}
              icon={Activity}
              color="text-red-500"
              change={`${analytics.summary.total_improvements} Improvements`}
              trend="down"
            />

            <StatCard
              title="Model Health"
              value={analytics.summary.latest_health_status.replace(
                /^🟢\s*|^🟡\s*|^🔴\s*/,
                ""
              )}
              icon={ShieldCheck}
              color="text-green-500"
              change={analytics.summary.latest_deployment_status.replace(
                /^✅\s*/,
                ""
              )}
            />
          </div>
        </section>

        {/* ===================== Analytics ===================== */}

        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Performance Analytics
            </h2>

            <p className="text-sm text-slate-400">
              Evaluation accuracy and model health over recent
              runs.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <AccuracyChart
                data={analytics.accuracy_history}
              />
            </div>

            <HealthChart
              data={analytics.health_distribution}
            />
          </div>
        </section>

        {/* ===================== Operations ===================== */}

        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Operations
            </h2>

            <p className="text-sm text-slate-400">
              Recent evaluations and quick actions.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RecentReports
                reports={analytics.recent_reports}
              />
            </div>

            <QuickActions />
          </div>
        </section>
      </div>
    </>
  );
}