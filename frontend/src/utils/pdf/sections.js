import COLORS from "./colors";
import { formatDate, formatExecutionTime } from "./helpers";

/* ===========================================================
   HEALTH STATUS FORMATTER
=========================================================== */

function formatHealthStatus(status) {
  if (!status) return "N/A";

  const cleaned = status
    .replace(/[🟢🟡🔴]\s*/g, "")
    .trim();

  switch (cleaned) {
    case "Model Improved":
      return "GOOD";

    case "Model Stable":
      return "STABLE";

    case "Model Regressed":
      return "POOR";

    default:
      return cleaned.toUpperCase();
  }
}

/* ===========================================================
   HEADER
=========================================================== */

export function drawHeader(doc) {
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(...COLORS.white);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("EvalGuard AI", 20, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(
    "LLM Regression Evaluation Report",
    20,
    27
  );

  doc.setTextColor(...COLORS.text);
}

/* ===========================================================
   REPORT INFORMATION
=========================================================== */

export function drawReportInfo(doc, report) {

  let y = 50;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.text);

  doc.text(
    "Report Information",
    20,
    y
  );

  y += 10;

  doc.setDrawColor(...COLORS.border);
  doc.setFillColor(...COLORS.background);

  doc.roundedRect(
    20,
    y - 5,
    170,
    64,
    3,
    3,
    "FD"
  );

  const rows = [
    ["Report ID", `#${report.report_id}`],
    ["Generated", formatDate(report.timestamp)],
    ["Model", report.model ?? "-"],
    ["Prompt", report.prompt_name ?? "-"],
    ["Prompt Version", report.prompt_version ?? "-"],
    ["Dataset", report.dataset_name ?? "-"],
    ["Dataset Version", report.dataset_version ?? "-"],
    [
      "Execution Time",
      formatExecutionTime(
        report.execution_time_seconds ?? 0
      ),
    ],
  ];

  let rowY = y + 5;

  rows.forEach(([label, value]) => {

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.secondary);
    doc.text(label, 28, rowY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.text);
    doc.text(
      String(value),
      85,
      rowY
    );

    rowY += 7;

  });

  return y + 68;

}
/* ===========================================================
   KPI CARD
=========================================================== */

export function drawCard(
  doc,
  x,
  y,
  width,
  height,
  title,
  value
) {

  doc.setDrawColor(...COLORS.border);
  doc.setFillColor(...COLORS.card);

  doc.roundedRect(
    x,
    y,
    width,
    height,
    3,
    3,
    "FD"
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.secondary);

  doc.text(
    title,
    x + width / 2,
    y + 8,
    {
      align: "center",
    }
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.primaryDark);

  const lines = doc.splitTextToSize(
    String(value),
    width - 8
  );

  doc.text(
    lines,
    x + width / 2,
    y + 19,
    {
      align: "center",
    }
  );

}

/* ===========================================================
   EXECUTIVE SUMMARY
=========================================================== */

export function drawExecutiveSummary(
  doc,
  report,
  startY
) {

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.text);

  doc.text(
    "Executive Summary",
    20,
    startY
  );

  startY += 10;

  drawCard(
    doc,
    20,
    startY,
    40,
    32,
    "Accuracy",
    `${report.current_accuracy}%`
  );

  drawCard(
    doc,
    65,
    startY,
    40,
    32,
    "Tests",
    report.total_test_cases
  );

  drawCard(
    doc,
    110,
    startY,
    40,
    32,
    "Delta",
    `${report.accuracy_delta}%`
  );

  drawCard(
    doc,
    155,
    startY,
    35,
    32,
    "Health",
    formatHealthStatus(
      report.health_status
    )
  );

  startY += 42;

  doc.setFont(
    "helvetica",
    "italic"
  );

  doc.setFontSize(10);
  doc.setTextColor(...COLORS.secondary);

  doc.text(
    "Overall model quality and deployment readiness based on automated regression evaluation.",
    20,
    startY,
    {
      maxWidth: 170,
    }
  );

  return startY + 12;

}
/* ===========================================================
   DEPLOYMENT RECOMMENDATION
=========================================================== */

export function drawDeploymentRecommendation(
  doc,
  report,
  startY
) {

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.text);

  doc.text(
    "Deployment Recommendation",
    20,
    startY
  );

  startY += 8;

  doc.setDrawColor(...COLORS.border);
  doc.setFillColor(...COLORS.background);

  // Slightly taller card
  doc.roundedRect(
    20,
    startY,
    170,
    50,
    3,
    3,
    "FD"
  );

  /* ===========================================================
     Recommendation Color
  =========================================================== */

  let recommendationColor = COLORS.success;

const recommendation = (
  report.deployment_recommendation ?? ""
)
  .replace(/[^\x20-\x7E]/g, "")
  .trim();

  if (
    recommendation
      .toLowerCase()
      .includes("caution")
  ) {
    recommendationColor = COLORS.warning;
  }

  if (
    recommendation
      .toLowerCase()
      .includes("not")
  ) {
    recommendationColor = COLORS.danger;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...recommendationColor);

  doc.text(
    recommendation,
    28,
    startY + 11
  );

  /* ===========================================================
     Summary
  =========================================================== */

  const summary = [
    [
      "Accuracy",
      `${report.current_accuracy}%`,
    ],
    [
      "Health",
      formatHealthStatus(
        report.health_status
      ),
    ],
    [
      "Regressions",
      report.regressions.length,
    ],
    [
      "Improvements",
      report.improvements.length,
    ],
  ];

  let y = startY + 22;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  summary.forEach(([label, value]) => {

    doc.setTextColor(...COLORS.secondary);

    doc.text(
      label,
      28,
      y
    );

    // dotted separator
    doc.setTextColor(...COLORS.border);

    doc.text(
      "................................",
      58,
      y
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setTextColor(...COLORS.text);

    doc.text(
      String(value),
      138,
      y
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    y += 6;

  });

  return startY + 60;

}