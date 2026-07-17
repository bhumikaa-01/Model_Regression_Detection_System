import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Button,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import MainLayout from "../../components/layout/MainLayout";
import { getReportById } from "../../services/api";

import ImprovementTable from "../../components/tables/ImprovementTable";
import RegressionTable from "../../components/tables/RegressionTable";
import UnchangedPassesTable from "../../components/tables/UnchangedPassesTable";
import StillFailingTable from "../../components/tables/StillFailingTable";

import PageSkeleton from "../../components/common/PageSkeleton";

export default function ReportDetails({ mode, toggleTheme }) {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    async function loadReport() {
      try {
        const data = await getReportById(reportId);
        setReport(data);
        toast.success("Report loaded successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load report");
      }
    }

    loadReport();
  }, [reportId]);

  const exportJSON = () => {
    try {
      const blob = new Blob(
        [JSON.stringify(report, null, 2)],
        {
          type: "application/json",
        }
      );

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `report_${report.report_id}.json`;

      link.click();

      URL.revokeObjectURL(url);

      toast.success("JSON exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export JSON");
    }
  };

  const exportPDF = () => {
    try {
      const pdf = new jsPDF();

      let y = 20;

      pdf.setFontSize(20);
      pdf.setTextColor(30);
      pdf.text("LLM Regression Detection Report", 20, y);

      y += 15;

      pdf.setDrawColor(220);
      pdf.line(20, y, 190, y);

      y += 10;

      pdf.setFontSize(12);

      const rows = [
        ["Report ID", report.report_id],
        ["Model", report.model],
        ["Prompt", report.prompt_name],
        ["Prompt Version", report.prompt_version],
        ["Dataset", report.dataset_name],
        ["Accuracy", `${report.current_accuracy}%`],
        ["Health", report.health_status],
        ["Recommendation", report.deployment_recommendation],
        ["Improvements", report.improvements?.length ?? 0],
        ["Regressions", report.regressions?.length ?? 0],
        ["Unchanged Passes", report.unchanged_passes?.length ?? 0],
        ["Still Failing", report.still_failing?.length ?? 0],
      ];

      const sanitize = (value) =>
        String(value ?? "")
          .replace(/[^\x20-\x7E]/g, " ")
          .replace(/\s+/g, " ")
          .trim();

      rows.forEach(([key, value]) => {
        pdf.setFont(undefined, "bold");
        pdf.text(`${key}:`, 20, y);

        pdf.setFont(undefined, "normal");

        const wrapped = pdf.splitTextToSize(
          sanitize(value),
          110
        );

        pdf.text(wrapped, 75, y);

        y += Math.max(10, wrapped.length * 7);
      });

      pdf.setDrawColor(220);
      pdf.line(20, y, 190, y);

      y += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(120);

      pdf.text(
        `Generated: ${new Date().toLocaleString()}`,
        20,
        y
      );

      pdf.save(`report_${report.report_id}.pdf`);

      toast.success("PDF exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF");
    }
  };

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
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight={700}
        >
          Report #{report.report_id}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
        >
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={exportJSON}
          >
            Export JSON
          </Button>

          <Button
            variant="contained"
            startIcon={<PictureAsPdfIcon />}
            onClick={exportPDF}
          >
            Export PDF
          </Button>
        </Stack>
      </Stack>

      <Grid
        container
        spacing={3}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
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
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
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

              <Typography mb={2}>
                {report.health_status}
              </Typography>

              <Typography fontWeight={700}>
                Deployment Recommendation
              </Typography>

              <Typography>
                {report.deployment_recommendation}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ImprovementTable improvements={report.improvements} />

      <RegressionTable regressions={report.regressions} />

      <UnchangedPassesTable
        unchangedPasses={report.unchanged_passes}
      />

      <StillFailingTable
        stillFailing={report.still_failing}
      />
    </MainLayout>
  );
}