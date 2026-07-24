import COLORS from "./colors";
import { generateAccuracyChart } from "./charts";
import {
  checkPageBreak,
  addNewPage,
} from "./helpers";

/* ===========================================================
   CONSTANTS
=========================================================== */

const PAGE_MARGIN = 20;
const CARD_GAP = 8;
const CARD_RADIUS = 4;

const PAGE_WIDTH = 210;
const CONTENT_WIDTH = 170;

const KPI_CARD_WIDTH = 39;
const KPI_CARD_HEIGHT = 28;

const DASHBOARD_CARD_WIDTH = 81;
const DASHBOARD_CARD_HEIGHT = 78;

/* ===========================================================
   QUALITY GRADE
=========================================================== */

function calculateQualityGrade(report) {
  const accuracy = report.current_accuracy ?? 0;
  const regressions = report.regressions?.length ?? 0;

  if (accuracy >= 98 && regressions === 0) {
    return "A+";
  }

  if (accuracy >= 95) {
    return "A";
  }

  if (accuracy >= 90) {
    return "B";
  }

  if (accuracy >= 80) {
    return "C";
  }

  return "D";
}

/* ===========================================================
   RISK SCORE
=========================================================== */

function calculateRiskScore(report) {
  const regressions = report.regressions?.length ?? 0;
  const failures = report.still_failing?.length ?? 0;

  let score =
    regressions * 20 +
    failures * 8;

  score = Math.min(score, 100);

  return score;
}

/* ===========================================================
   DEPLOYMENT CONFIDENCE
=========================================================== */

function calculateConfidence(report) {
  const accuracy =
    report.current_accuracy ?? 0;

  const regressions =
    report.regressions?.length ?? 0;

  const improvements =
    report.improvements?.length ?? 0;

  let confidence =
    accuracy -
    regressions * 3 +
    improvements;

  confidence = Math.max(
    0,
    Math.min(100, confidence)
  );

  return Math.round(confidence);
}

/* ===========================================================
   TREND
=========================================================== */

function calculateTrend(report) {
  const delta =
    report.accuracy_delta ?? 0;

  if (delta > 0) {
    return "↑ Improved";
  }

  if (delta < 0) {
    return "↓ Regressed";
  }

  return "→ Stable";
}

/* ===========================================================
   RISK LABEL
=========================================================== */

function getRiskLabel(score) {
  if (score <= 20) {
    return "LOW";
  }

  if (score <= 50) {
    return "MEDIUM";
  }

  return "HIGH";
}

/* ===========================================================
   DEPLOYMENT COLOR
=========================================================== */

function getStatusColor(report) {
  const accuracy =
    report.current_accuracy ?? 0;

  const regressions =
    report.regressions?.length ?? 0;

  if (accuracy >= 95 && regressions === 0) {
    return COLORS.success;
  }

  if (accuracy >= 80 && regressions <= 2) {
    return COLORS.warning;
  }

  return COLORS.danger;
}

/* ===========================================================
   SECTION TITLE
=========================================================== */

function drawSectionTitle(doc, title, subtitle) {

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...COLORS.primaryDark);

  doc.text(title, PAGE_MARGIN, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.secondary);

  doc.text(
    subtitle,
    PAGE_MARGIN,
    36
  );

  doc.setDrawColor(...COLORS.border);

  doc.line(
    PAGE_MARGIN,
    42,
    190,
    42
  );
}

/* ===========================================================
   KPI CARD
=========================================================== */

function drawMetricCard(
  doc,
  x,
  y,
  title,
  value,
  color = COLORS.primary
) {

  doc.setDrawColor(...COLORS.border);

  doc.setFillColor(...COLORS.card);

  doc.roundedRect(
    x,
    y,
    KPI_CARD_WIDTH,
    KPI_CARD_HEIGHT,
    CARD_RADIUS,
    CARD_RADIUS,
    "FD"
  );

  doc.setFillColor(...color);

  doc.rect(
    x,
    y,
    KPI_CARD_WIDTH,
    4,
    "F"
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.secondary);

  doc.text(
    title,
    x + 5,
    y + 11
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...COLORS.text);

  doc.text(
    String(value),
    x + KPI_CARD_WIDTH / 2,
    y + 22,
    {
      align: "center",
    }
  );
}

/* ===========================================================
   EXECUTIVE KPI ROW
=========================================================== */

function drawExecutiveKPIs(
  doc,
  report,
  startY
) {

  drawMetricCard(
    doc,
    20,
    startY,
    "Accuracy",
    `${report.current_accuracy}%`
  );

  drawMetricCard(
    doc,
    67,
    startY,
    "Delta",
    `${report.accuracy_delta}%`
  );

  drawMetricCard(
    doc,
    114,
    startY,
    "Confidence",
    `${calculateConfidence(report)}%`,
    COLORS.success
  );

  drawMetricCard(
    doc,
    161,
    startY,
    "Risk",
    getRiskLabel(
      calculateRiskScore(report)
    ),
    getStatusColor(report)
  );

  return startY + 38;
}

/* ===========================================================
   DASHBOARD CARD
=========================================================== */

function drawDashboardCard(
  doc,
  x,
  y,
  title
) {
  doc.setDrawColor(...COLORS.border);
  doc.setFillColor(...COLORS.card);

  doc.roundedRect(
    x,
    y,
    DASHBOARD_CARD_WIDTH,
    DASHBOARD_CARD_HEIGHT,
    CARD_RADIUS,
    CARD_RADIUS,
    "FD"
  );

  doc.setFillColor(...COLORS.primary);

  doc.rect(
    x,
    y,
    DASHBOARD_CARD_WIDTH,
    5,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.primaryDark);

  doc.text(
    title,
    x + 5,
    y + 13
  );
}

/* ===========================================================
   ACCURACY CARD
=========================================================== */

function drawAccuracyCard(
  doc,
  report,
  x,
  y
) {
  drawDashboardCard(
    doc,
    x,
    y,
    "Accuracy Comparison"
  );

  const chart = generateAccuracyChart(report);

  doc.addImage(
    chart,
    "PNG",
    x + 4,
    y + 18,
    73,
    48
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.secondary);

  doc.text(
    `Previous : ${report.previous_accuracy}%`,
    x + 5,
    y + 72
  );
}

/* ===========================================================
   DEPLOYMENT HEALTH
=========================================================== */

function drawDeploymentHealthCard(
  doc,
  report,
  x,
  y
) {

  drawDashboardCard(
    doc,
    x,
    y,
    "Deployment Health"
  );

  const color =
    getStatusColor(report);

  doc.setFillColor(...color);

  doc.circle(
    x + 40,
    y + 34,
    10,
    "F"
  );

  doc.setFont("helvetica","bold");
  doc.setFontSize(20);
  doc.setTextColor(...COLORS.white);

  doc.text(
    `${report.current_accuracy}%`,
    x + 40,
    y + 36,
    {
      align:"center"
    }
  );

  doc.setTextColor(...COLORS.text);

  doc.setFont("helvetica","bold");
  doc.setFontSize(11);

  doc.text(
    report.deployment_recommendation,
    x + 40,
    y + 56,
    {
      align:"center",
      maxWidth:65
    }
  );

  doc.setFont("helvetica","normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.secondary);

  doc.text(
    `Health : ${report.health_status}`,
    x + 5,
    y + 71
  );
}

/* ===========================================================
   REGRESSION SUMMARY
=========================================================== */

function drawRegressionSummaryCard(
  doc,
  report,
  x,
  y
){

  drawDashboardCard(
    doc,
    x,
    y,
    "Regression Summary"
  );

  const rows=[
    [
      "Improvements",
      report.improvements.length,
      COLORS.success
    ],
    [
      "Regressions",
      report.regressions.length,
      COLORS.danger
    ],
    [
      "Still Passing",
      report.unchanged_passes.length,
      COLORS.primary
    ],
    [
      "Still Failing",
      report.still_failing.length,
      COLORS.warning
    ]
  ];

  let rowY=y+22;

  rows.forEach(([label,value,color])=>{

    doc.setFillColor(...color);

    doc.circle(
      x+8,
      rowY-2,
      2,
      "F"
    );

    doc.setFont("helvetica","normal");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.text);

    doc.text(
      label,
      x+14,
      rowY
    );

    doc.setFont("helvetica","bold");

    doc.text(
      String(value),
      x+72,
      rowY,
      {
        align:"right"
      }
    );

    rowY+=11;

  });

}

/* ===========================================================
   DISTRIBUTION CARD
=========================================================== */

function drawDistributionCard(
  doc,
  report,
  x,
  y
){

  drawDashboardCard(
    doc,
    x,
    y,
    "Evaluation Distribution"
  );

  const passed=
    report.improvements.length+
    report.unchanged_passes.length;

  const failed=
    report.regressions.length+
    report.still_failing.length;

  const total=
    Math.max(1,passed+failed);

  const passWidth=
    (passed/total)*60;

  const failWidth=
    (failed/total)*60;

  doc.setFillColor(...COLORS.success);

  doc.roundedRect(
    x+10,
    y+28,
    passWidth,
    10,
    2,
    2,
    "F"
  );

  doc.setFillColor(...COLORS.danger);

  doc.roundedRect(
    x+10+passWidth,
    y+28,
    failWidth,
    10,
    2,
    2,
    "F"
  );

  doc.setFont("helvetica","normal");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.text);

  doc.text(
    `Pass : ${passed}`,
    x+10,
    y+50
  );

  doc.text(
    `Fail : ${failed}`,
    x+10,
    y+60
  );

  doc.setFont("helvetica","bold");
  doc.setFontSize(12);

  doc.text(
    `Grade : ${calculateQualityGrade(report)}`,
    x+10,
    y+71
  );
}