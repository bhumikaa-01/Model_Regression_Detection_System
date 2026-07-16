import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

import MainLayout from "../../components/layout/MainLayout";
import { getReportById } from "../../services/api";

import ImprovementTable from "../../components/tables/ImprovementTable";
import RegressionTable from "../../components/tables/RegressionTable";
import UnchangedPassesTable from "../../components/tables/UnchangedPassesTable";
import StillFailingTable from "../../components/tables/StillFailingTable";

import PageSkeleton from "../../components/common/PageSkeleton";

export default function ReportDetails({
  mode,
  toggleTheme,
}) {
  const { reportId } = useParams();

  const [report, setReport] = useState(null);

  useEffect(() => {
    async function loadReport() {
      try {
        const data = await getReportById(reportId);
        setReport(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadReport();
  }, [reportId]);

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
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Report #{report.report_id}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography fontWeight={700}>
                Model
              </Typography>

              <Typography mb={2}>
                {report.model}
              </Typography>

              <Typography fontWeight={700}>
                Prompt
              </Typography>

              <Typography mb={2}>
                {report.prompt_name}
              </Typography>

              <Typography fontWeight={700}>
                Prompt Version
              </Typography>

              <Typography>
                {report.prompt_version}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography fontWeight={700}>
                Dataset
              </Typography>

              <Typography mb={2}>
                {report.dataset_name}
              </Typography>

              <Typography fontWeight={700}>
                Accuracy
              </Typography>

              <Typography mb={2}>
                {report.current_accuracy}%
              </Typography>

              <Typography fontWeight={700}>
                Health Status
              </Typography>

              <Typography>
                {report.health_status}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ImprovementTable
        improvements={report.improvements}
      />

      <RegressionTable
        regressions={report.regressions}
      />

      <UnchangedPassesTable
        unchangedPasses={report.unchanged_passes}
      />

      <StillFailingTable
        stillFailing={report.still_failing}
      />
    </MainLayout>
  );
}