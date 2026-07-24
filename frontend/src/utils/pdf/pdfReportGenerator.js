import { jsPDF } from "jspdf";

import { drawCoverPage } from "./coverPage";

import {
  drawHeader,
  drawReportInfo,
  drawExecutiveSummary,
  drawDeploymentRecommendation,
} from "./sections";

import { drawTable } from "./tables";
import { generateAccuracyChart } from "./charts";

import {
  addPageNumber,
  checkPageBreak,
  addNewPage,
} from "./helpers";

const CHART_HEIGHT = 80;
const SECTION_SPACING = 5;
const TOP_MARGIN = 45;

export function generatePDFReport(report) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  /* ===========================================================
     PDF Metadata
  =========================================================== */

  doc.setProperties({
    title: `EvalGuard AI Report #${report.report_id}`,
    subject: "LLM Regression Evaluation Report",
    author: "EvalGuard AI",
    creator: "EvalGuard AI",
    keywords: "LLM, Regression, AI, Evaluation",
  });

  /* ===========================================================
     PAGE 1 : COVER PAGE
  =========================================================== */

  drawCoverPage(doc, report);

  /* ===========================================================
     PAGE 2 : EXECUTIVE DASHBOARD
  =========================================================== */

  doc.addPage();

  drawHeader(doc);

  /* ===========================================================
     REPORT INFORMATION
  =========================================================== */

  const reportInfoEndY = drawReportInfo(
    doc,
    report
  );

  /* ===========================================================
     EXECUTIVE SUMMARY
  =========================================================== */

  const summaryEndY =
    drawExecutiveSummary(
      doc,
      report,
      reportInfoEndY
    );

  /* ===========================================================
     DEPLOYMENT RECOMMENDATION
  =========================================================== */

  let currentY =
    drawDeploymentRecommendation(
      doc,
      report,
      summaryEndY
    );

  /* ===========================================================
     ACCURACY ANALYTICS
  =========================================================== */

  if (
    checkPageBreak(
      doc,
      currentY,
      CHART_HEIGHT + SECTION_SPACING
    )
  ) {
    currentY = addNewPage(doc);

    drawHeader(doc);

    currentY = TOP_MARGIN;
  }

  const chartImage =
    generateAccuracyChart(report);

  doc.addImage(
    chartImage,
    "PNG",
    20,
    currentY,
    170,
    CHART_HEIGHT
  );

  currentY +=
    CHART_HEIGHT +
    SECTION_SPACING;

  /* ===========================================================
     DETAILED RESULTS
  =========================================================== */

  const tableSections = [
    {
      title: "Improvements",
      data: report.improvements,
    },
    {
      title: "Regressions",
      data: report.regressions,
    },
    {
      title: "Still Passing",
      data: report.unchanged_passes,
    },
    {
      title: "Still Failing",
      data: report.still_failing,
    },
  ];

  tableSections.forEach(
    ({ title, data }) => {
      currentY = drawTable(
        doc,
        title,
        data,
        currentY
      );
    }
  );

  /* ===========================================================
     FOOTER
  =========================================================== */

  addPageNumber(doc);

  /* ===========================================================
     SAVE PDF
  =========================================================== */

  doc.save(
    `EvalGuard_Report_${report.report_id}.pdf`
  );
}