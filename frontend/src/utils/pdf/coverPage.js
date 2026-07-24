import COLORS from "./colors";
import { formatDate, formatExecutionTime } from "./helpers";

/* ===========================================================
   STATUS CONFIGURATION
=========================================================== */

function getDeploymentStatus(report) {
  const accuracy = report.current_accuracy ?? 0;
  const regressions = report.regressions?.length ?? 0;

  if (accuracy >= 95 && regressions === 0) {
    return {
      label: "SAFE TO DEPLOY",
      color: COLORS.success,
    };
  }

  if (accuracy >= 80 && regressions <= 2) {
    return {
      label: "DEPLOY WITH CAUTION",
      color: COLORS.warning,
    };
  }

  return {
    label: "DO NOT DEPLOY",
    color: COLORS.danger,
  };
}

/* ===========================================================
   QUALITY METRICS
=========================================================== */

function getQualityGrade(report) {
  const accuracy = report.current_accuracy ?? 0;
  const regressions = report.regressions?.length ?? 0;

  if (accuracy >= 98 && regressions === 0) return "A+";
  if (accuracy >= 95) return "A";
  if (accuracy >= 90) return "B";
  if (accuracy >= 80) return "C";

  return "D";
}

function getConfidence(report) {
  const accuracy = report.current_accuracy ?? 0;
  const regressions = report.regressions?.length ?? 0;
  const improvements = report.improvements?.length ?? 0;

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        accuracy - regressions * 2 + improvements
      )
    )
  );
}

function getRisk(report) {
  const regressions = report.regressions?.length ?? 0;
  const failures = report.still_failing?.length ?? 0;

  const score =
    regressions * 20 +
    failures * 8;

  if (score <= 20) return "LOW";
  if (score <= 50) return "MED";

  return "HIGH";
}

/* ===========================================================
   KPI CARD
=========================================================== */

function drawKpiCard(
  doc,
  x,
  y,
  title,
  value
) {
  doc.setFillColor(...COLORS.background);
  doc.setDrawColor(...COLORS.border);

  doc.roundedRect(
    x,
    y,
    38,
    24,
    3,
    3,
    "FD"
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.secondary);

  doc.text(
    title,
    x + 19,
    y + 8,
    {
      align: "center",
    }
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  switch(title){

    case "Risk":
        doc.setTextColor(...COLORS.success);
        break;

    case "Grade":
        doc.setTextColor(...COLORS.primaryDark);
        break;

    case "Accuracy":
        doc.setTextColor(...COLORS.primaryDark);
        break;

    case "Confidence":
        doc.setTextColor(...COLORS.success);
        break;

    case "Health":
        switch(String(value).toUpperCase()){

            case "GOOD":
                doc.setTextColor(...COLORS.success);
                break;

            case "STABLE":
                doc.setTextColor(...COLORS.warning);
                break;

            case "POOR":
                doc.setTextColor(...COLORS.danger);
                break;

            default:
                doc.setTextColor(...COLORS.primaryDark);
        }
        break;

    default:
        doc.setTextColor(...COLORS.primaryDark);
}

  doc.text(
    String(value),
    x + 19,
    y + 18,
    {
      align: "center",
    }
  );
}

/* ===========================================================
   DRAW STATUS BADGE
=========================================================== */

function drawStatusBadge(
  doc,
  report,
  y
) {
  const status =
    getDeploymentStatus(report);

  doc.setFillColor(...status.color);

  doc.roundedRect(
    45,
    y,
    120,
    14,
    5,
    5,
    "F"
  );

  doc.setTextColor(...COLORS.white);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text(
    status.label,
    105,
    y + 9,
    {
      align: "center",
    }
  );

  doc.setTextColor(...COLORS.text);

  return y + 22;
}

/* ===========================================================
   METADATA CARD
=========================================================== */

function drawMetadataCard(
  doc,
  report,
  y
) {
  doc.setFillColor(...COLORS.background);

  doc.setDrawColor(...COLORS.border);

  doc.roundedRect(
    20,
    y,
    170,
    78,
    4,
    4,
    "FD"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.primaryDark);

  doc.text(
    "Report Information",
    30,
    y + 10
  );

  const rows = [
    ["Report ID", `#${report.report_id}`],
    ["Generated", formatDate(report.timestamp)],
    ["Model", report.model ?? "-"],
    ["Prompt", report.prompt_name ?? "-"],
    ["Dataset", report.dataset_name ?? "-"],
    [
      "Execution Time",
      formatExecutionTime(
        report.execution_time_seconds ?? 0
      ),
    ],
    [
      "Total Tests",
      report.total_test_cases ?? "-",
    ],
  ];

  let rowY = y + 20;

  rows.forEach(
    ([label, value]) => {

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(10);
      doc.setTextColor(...COLORS.secondary);

      doc.text(
        label,
        30,
        rowY
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setTextColor(...COLORS.text);

      doc.text(
        String(value),
        95,
        rowY
      );

      rowY += 8;
    }
  );

  return y + 86;
}
/* ===========================================================
   COVER PAGE
=========================================================== */

export function drawCoverPage(doc, report) {

  /* ===========================================================
     Background
  =========================================================== */

  doc.setFillColor(...COLORS.white);
  doc.rect(
    0,
    0,
    210,
    297,
    "F"
  );

  /* ===========================================================
     Top Accent Bar
  =========================================================== */

  doc.setFillColor(...COLORS.primary);

  doc.rect(
    0,
    0,
    210,
    12,
    "F"
  );

  /* ===========================================================
     Main Title
  =========================================================== */

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(30);

  doc.setTextColor(...COLORS.primaryDark);

  doc.text(
    "EvalGuard AI",
    105,
    36,
    {
      align: "center",
    }
  );

  /* ===========================================================
     Subtitle
  =========================================================== */

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(16);

  doc.setTextColor(...COLORS.secondary);

  doc.text(
    "LLM Regression Evaluation Report",
    105,
    47,
    {
      align: "center",
    }
  );

  doc.setFontSize(11);

  doc.text(
    "Continuous AI Quality & Regression Monitoring",
    105,
    56,
    {
      align: "center",
    }
  );

  /* ===========================================================
     Divider
  =========================================================== */

  doc.setDrawColor(...COLORS.border);

  doc.line(
    25,
    64,
    185,
    64
  );

  let y = 74;

  /* ===========================================================
     Deployment Status
  =========================================================== */

  y = drawStatusBadge(
    doc,
    report,
    y
  );

  /* ===========================================================
     KPI Dashboard
  =========================================================== */

  drawKpiCard(
    doc,
    20,
    y,
    "Accuracy",
    `${report.current_accuracy ?? 0}%`
  );

  drawKpiCard(
    doc,
    63,
    y,
    "Grade",
    getQualityGrade(report)
  );

  drawKpiCard(
    doc,
    106,
    y,
    "Confidence",
    `${getConfidence(report)}%`
  );

  drawKpiCard(
    doc,
    149,
    y,
    "Risk",
    getRisk(report)
  );

  y += 34;

  /* ===========================================================
     Summary Text
  =========================================================== */

  doc.setFont(
    "helvetica",
    "italic"
  );

  doc.setFontSize(10);

  doc.setTextColor(...COLORS.secondary);

  doc.text(
    "This report summarizes the quality evaluation of the latest LLM deployment using automated regression testing.",
    105,
    y,
    {
      align: "center",
      maxWidth: 165,
    }
  );

  y += 14;

  /* ===========================================================
     Metadata
  =========================================================== */

  y = drawMetadataCard(
    doc,
    report,
    y
  );

  /* ===========================================================
     Prepared By
  =========================================================== */

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(12);

  doc.setTextColor(...COLORS.primaryDark);

  doc.text(
    "Prepared By",
    105,
    y + 8,
    {
      align: "center",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(11);

  doc.setTextColor(...COLORS.text);

  doc.text(
    "EvalGuard AI Platform",
    105,
    y + 17,
    {
      align: "center",
    }
  );

  doc.text(
    "Production AI Evaluation • Regression Detection",
    105,
    y + 24,
    {
      align: "center",
    }
  );

  

}