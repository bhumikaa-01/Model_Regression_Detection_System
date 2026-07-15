import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import MainLayout from "../../components/layout/MainLayout";
import { getAnalytics } from "../../services/api";

import AccuracyChart from "../../components/charts/AccuracyChart";

import RegressionChart from "../../components/charts/RegressionChart";

import HealthDistributionChart from "../../components/charts/HealthDistributionChart";

import RecentReportsTable from "../../components/tables/RecentReportsTable";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await getAnalytics();
        console.log(data);
        setAnalytics(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadAnalytics();
  }, []);

  if (!analytics) {
    return (
      <MainLayout>
        <Typography variant="h5">
          Loading Analytics...
        </Typography>
      </MainLayout>
    );
  }

 return (
  <MainLayout>

    <Typography
      variant="h4"
      fontWeight={700}
      mb={3}
    >
      Analytics Dashboard
    </Typography>

    {/* Summary Cards */}
    <Grid container spacing={3}>

      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total Runs
            </Typography>

            <Typography variant="h3" fontWeight={700}>
              {analytics.total_runs}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Average Accuracy
            </Typography>

            <Typography variant="h3" fontWeight={700}>
              {analytics.average_accuracy}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total Regressions
            </Typography>

            <Typography variant="h3" fontWeight={700}>
              {analytics.total_regressions}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Health States
            </Typography>

            <Typography variant="h3" fontWeight={700}>
              {Object.keys(analytics.health_distribution).length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>

    {/* Charts */}
    <AccuracyChart
      data={analytics.accuracy_history}
    />

    <RegressionChart
      data={analytics.regression_history}
    />

    <HealthDistributionChart
       data={analytics.health_distribution}
    />

    <RecentReportsTable
        reports={analytics.recent_reports}
    />

  </MainLayout>
);
}