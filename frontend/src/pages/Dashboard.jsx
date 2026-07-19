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

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* ===================== Header ===================== */}
      <PageHeader
        title="Dashboard"
        subtitle="Monitor your LLM evaluation metrics, regression history and model health."
        buttonText="Run Evaluation"
        onButtonClick={() => {}}
      />

      {/* ===================== KPI Cards ===================== */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Accuracy"
          value="98.4%"
          icon={BarChart3}
          color="text-blue-500"
          change="+1.4%"
        />

        <StatCard
          title="Reports"
          value="28"
          icon={FileText}
          color="text-purple-500"
          change="+5"
        />

        <StatCard
          title="Regressions"
          value="2"
          icon={Activity}
          color="text-red-500"
          change="-1"
          trend="down"
        />

        <StatCard
          title="Model Health"
          value="Healthy"
          icon={ShieldCheck}
          color="text-green-500"
          change="Excellent"
        />
      </div>

      {/* ===================== Charts ===================== */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AccuracyChart />
        </div>

        <HealthChart />
      </div>

      {/* ===================== Reports & Actions ===================== */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentReports />
        </div>

        <QuickActions />
      </div>
    </div>
  );
}