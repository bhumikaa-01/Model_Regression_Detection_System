import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
} from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FavoriteIcon from "@mui/icons-material/Favorite";

import MainLayout from "../../components/layout/MainLayout";
import { getAnalytics } from "../../services/api";

import SummaryCard from "../../components/cards/SummaryCard";

import AccuracyChart from "../../components/charts/AccuracyChart";
import RegressionChart from "../../components/charts/RegressionChart";
import HealthDistributionChart from "../../components/charts/HealthDistributionChart";
import RecentReportsTable from "../../components/tables/RecentReportsTable";

import PageSkeleton from "../../components/common/PageSkeleton";

export default function Analytics({
  mode,
  toggleTheme,
}) {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadAnalytics();
  }, []);

  if (!analytics) {
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
      {/* Header */}

      <Typography
        variant="h4"
        fontWeight={800}
      >
        Analytics Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Insights from all evaluation reports and regression runs.
      </Typography>

      {/* KPI Cards */}

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Total Runs"
            value={analytics.total_runs}
            subtitle="Evaluation Reports"
            color="#2563EB"
            icon={<AssessmentIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Average Accuracy"
            value={`${analytics.average_accuracy}%`}
            subtitle="Across All Runs"
            color="#16A34A"
            icon={<TrendingUpIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Regressions"
            value={analytics.total_regressions}
            subtitle="Detected"
            color="#DC2626"
            icon={<WarningAmberIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SummaryCard
            title="Health States"
            value={
              Object.keys(
                analytics.health_distribution
              ).length
            }
            subtitle="Unique States"
            color="#9333EA"
            icon={<FavoriteIcon fontSize="large" />}
          />
        </Grid>

      </Grid>

      {/* Charts */}

      <Box mt={5}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
        >
          Accuracy Trend
        </Typography>

        <AccuracyChart
          data={analytics.accuracy_history}
        />
      </Box>

      <Box mt={5}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
        >
          Regression Trend
        </Typography>

        <RegressionChart
          data={analytics.regression_history}
        />
      </Box>

      <Box mt={5}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
        >
          Health Distribution
        </Typography>

        <HealthDistributionChart
          data={analytics.health_distribution}
        />
      </Box>

      <Box mt={5}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
        >
          Recent Reports
        </Typography>

        <RecentReportsTable
          reports={analytics.recent_reports}
        />
      </Box>

    </MainLayout>
  );
}