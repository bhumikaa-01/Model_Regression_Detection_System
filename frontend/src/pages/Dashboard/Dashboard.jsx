import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import MainLayout from "../../components/layout/MainLayout";
import HeroBanner from "../../components/common/HeroBanner";
import SummaryCard from "../../components/cards/SummaryCard";
import AccuracyChart from "../../components/charts/AccuracyChart";
import DeploymentCard from "../../components/cards/DeploymentCard";

import { getLatestReport } from "../../services/api";

export default function Dashboard() {
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
      <MainLayout>
        <Typography variant="h5">
          Loading dashboard...
        </Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <HeroBanner />

      {/* Summary Cards */}
      <Grid container spacing={3} mt={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Latest Report"
            value={report.report_id}
            subtitle="Report ID"
            color="#111827"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Accuracy"
            value={`${report.current_accuracy}%`}
            subtitle="Latest Evaluation"
            color="#2563EB"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Regressions"
            value={report.regressions.length}
            subtitle="Detected"
            color="#DC2626"
          />
        </Grid>

        <SummaryCard
  title="Health"
  value={
    report.health_status === "Model Improved"
      ? "Healthy"
      : report.health_status
  }
  subtitle="Current Status"
  color="#059669"
/>
      </Grid>

      {/* Analytics Section */}
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