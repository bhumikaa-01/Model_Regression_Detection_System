import { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VerifiedIcon from "@mui/icons-material/Verified";
import MemoryIcon from "@mui/icons-material/Memory";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import TimerIcon from "@mui/icons-material/Timer";

import MainLayout from "../../components/layout/MainLayout";
import HeroBanner from "../../components/common/HeroBanner";
import SummaryCard from "../../components/cards/SummaryCard";
import AccuracyChart from "../../components/charts/AccuracyChart";
import DeploymentCard from "../../components/cards/DeploymentCard";
import PageSkeleton from "../../components/common/PageSkeleton";

import { getLatestReport } from "../../services/api";

export default function Dashboard({
  mode,
  toggleTheme,
}) {
  const [report, setReport] = useState(null);

  useEffect(() => {
    async function loadReport() {
      try {
        const data = await getLatestReport();
        setReport(data);
      } catch (err) {
        console.error("Failed to load latest report:", err);
      }
    }

    loadReport();
  }, []);

  if (!report) {
    return (
      <MainLayout
        mode={mode}
        toggleTheme={toggleTheme}
      >
        <PageSkeleton />
      </MainLayout>
    );
  }

  return (
    <MainLayout
      mode={mode}
      toggleTheme={toggleTheme}
    >
      <HeroBanner />

      {/* ================= KPI Cards ================= */}

      <Grid container spacing={3} mt={2}>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Latest Report"
            value={`#${report.report_id}`}
            subtitle="Most Recent Evaluation"
            color="#2563EB"
            icon={<AssessmentIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Accuracy"
            value={`${report.current_accuracy}%`}
            subtitle="Current Model Accuracy"
            color="#16A34A"
            icon={<VerifiedIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Regressions"
            value={report.regressions.length}
            subtitle="Issues Detected"
            color="#DC2626"
            icon={<WarningAmberIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Health"
            value={report.health_status.replace(
              /🟢|🔴|🟡/g,
              ""
            )}
            subtitle="Deployment Status"
            color="#9333EA"
            icon={<AutoAwesomeIcon fontSize="large" />}
          />
        </Grid>

      </Grid>

      {/* ================= Metadata Cards ================= */}

      <Grid container spacing={3} mt={1}>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Model"
            value={report.model}
            subtitle="Current LLM"
            color="#0F766E"
            icon={<MemoryIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Prompt"
            value={report.prompt_version}
            subtitle={report.prompt_name}
            color="#EA580C"
            icon={<DescriptionIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Dataset"
            value={report.dataset_version}
            subtitle={report.dataset_name}
            color="#0284C7"
            icon={<StorageIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Execution"
            value={`${report.execution_time_seconds.toFixed(2)} s`}
            subtitle="Evaluation Time"
            color="#7C3AED"
            icon={<TimerIcon fontSize="large" />}
          />
        </Grid>

      </Grid>

      {/* ================= Analytics ================= */}

      <Grid container spacing={3} mt={2}>

        <Grid size={{ xs: 12, lg: 8 }}>
          <AccuracyChart
            accuracy={report.current_accuracy}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DeploymentCard
            health={report.health_status}
            recommendation={report.deployment_recommendation}
          />
        </Grid>

      </Grid>

    </MainLayout>
  );
}