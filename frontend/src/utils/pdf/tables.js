import COLORS from "./colors";
import {
  checkPageBreak,
  addNewPage,
} from "./helpers";

const DEFAULT_COLUMN_WIDTHS = [
  28,
  34,
  42,
  42,
  34,
];

const DEFAULT_HEADERS = [
  "ID",
  "Expected",
  "Previous",
  "Current",
  "Status",
];

const BOTTOM_PADDING = 10;

/* ===========================================================
   Format Status
=========================================================== */

function formatStatus(status) {
  switch (status) {
    case "UNCHANGED_PASS":
      return "PASS";

    case "UNCHANGED_FAIL":
      return "FAIL";

    case "IMPROVEMENT":
      return "IMPROVED";

    case "REGRESSION":
      return "REGRESSION";

    default:
      return status ?? "-";
  }
}

/* ===========================================================
   Draw Table Header
=========================================================== */

function drawTableHeader(
  doc,
  title,
  startY,
  headers,
  columnWidths
) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...COLORS.text);

  doc.text(title, 20, startY);

  startY += 8;

  let x = 20;

  headers.forEach((header, index) => {
    doc.setFillColor(...COLORS.primary);
    doc.setDrawColor(...COLORS.primaryDark);

    doc.rect(
      x,
      startY,
      columnWidths[index],
      8,
      "FD"
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.white);

    doc.text(
      header,
      x + 2,
      startY + 5
    );

    x += columnWidths[index];
  });

  return startY + 8;
}

/* ===========================================================
   Calculate Minimum Space Required
=========================================================== */

function getMinimumTableHeight(rows) {
  if (!rows || rows.length === 0) {
    return 30;
  }

  return 36;
}

/* ===========================================================
   Generic Table Renderer
=========================================================== */

export function drawTable(
  doc,
  title,
  rows,
  startY,
  options = {}
) {
  const headers =
    options.headers ?? DEFAULT_HEADERS;

  const columnWidths =
    options.columnWidths ??
    DEFAULT_COLUMN_WIDTHS;

  const requiredHeight =
    getMinimumTableHeight(rows);

  if (
    checkPageBreak(
      doc,
      startY,
      requiredHeight + BOTTOM_PADDING
    )
  ) {
    startY = addNewPage(doc);
  }

  startY = drawTableHeader(
    doc,
    title,
    startY,
    headers,
    columnWidths
  );

  /* ===========================================================
     Empty Table
  =========================================================== */

  if (!rows || rows.length === 0) {

    doc.setDrawColor(...COLORS.border);
    doc.setFillColor(...COLORS.background);

    doc.rect(
      20,
      startY,
      columnWidths.reduce((a, b) => a + b, 0),
      10,
      "FD"
    );

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.secondary);

    doc.text(
      "No records available.",
      22,
      startY + 6
    );

    return startY + 18;
  }

  /* ===========================================================
     Draw Rows
  =========================================================== */

  rows.forEach((row, rowIndex) => {

    const values = [
      row.id ?? "-",
      row.expected ?? "-",
      row.previous_prediction ?? "-",
      row.current_prediction ?? "-",
      formatStatus(row.status),
    ];

    const wrappedText = values.map(
      (value, index) =>
        doc.splitTextToSize(
          String(value),
          columnWidths[index] - 4
        )
    );

    const maxLines = Math.max(
      ...wrappedText.map(
        (lines) => lines.length
      )
    );

    const rowHeight = Math.max(
      8,
      maxLines * 5 + 4
    );

    if (
      checkPageBreak(
        doc,
        startY,
        rowHeight + BOTTOM_PADDING
      )
    ) {
      startY = addNewPage(doc);

      startY = drawTableHeader(
        doc,
        title,
        startY,
        headers,
        columnWidths
      );
    }

    let x = 20;
        wrappedText.forEach(
      (textLines, index) => {

        /* =======================================================
           Zebra Striping
        ======================================================== */

        if (rowIndex % 2 === 0) {
          doc.setFillColor(...COLORS.white);
        } else {
          doc.setFillColor(...COLORS.background);
        }

        doc.setDrawColor(...COLORS.border);

        doc.rect(
          x,
          startY,
          columnWidths[index],
          rowHeight,
          "FD"
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(9);

        /* =======================================================
           Status Color
        ======================================================== */

        if (index === 4) {

          switch (values[index]) {

            case "PASS":
              doc.setTextColor(...COLORS.success);
              break;

            case "FAIL":
              doc.setTextColor(...COLORS.warning);
              break;

            case "IMPROVED":
              doc.setTextColor(...COLORS.primary);
              break;

            case "REGRESSION":
              doc.setTextColor(...COLORS.danger);
              break;

            default:
              doc.setTextColor(...COLORS.text);
          }

        } else {

          doc.setTextColor(...COLORS.text);

        }

        const textHeight =
          textLines.length * 5;

        const textY =
          startY +
          ((rowHeight - textHeight) / 2) +
          4;

        doc.text(
          textLines,
          x + 2,
          textY
        );

        x += columnWidths[index];
      }
    );

    startY += rowHeight;

  });

  return startY + 10;
}