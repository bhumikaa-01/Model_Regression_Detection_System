import COLORS from "./colors";
/* ===========================================================
   Date Formatting
=========================================================== */

export function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ===========================================================
   Execution Time Formatting
=========================================================== */

export function formatExecutionTime(seconds) {
  if (seconds < 1) {
    return `${(seconds * 1000).toFixed(0)} ms`;
  }

  return `${seconds.toFixed(3)} sec`;
}

/* ===========================================================
   Footer
=========================================================== */

export function addPageNumber(doc) {

  const pageCount = doc.internal.getNumberOfPages();

  for (let page = 1; page <= pageCount; page++) {

    doc.setPage(page);

    // Footer separator
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.3);
    doc.line(15, 285, 195, 285);

    // Footer text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.secondary);

    // Left
    doc.text(
      "Version 1.0",
      15,
      290
    );

    // Right
    doc.text(
      `Page ${page} of ${pageCount}`,
      195,
      290,
      {
        align: "right",
      }
    );

  }

}

/* ===========================================================
   Page Break Helper
=========================================================== */

export function checkPageBreak(
  doc,
  currentY,
  requiredHeight,
  bottomMargin = 20
) {
  const pageHeight =
    doc.internal.pageSize.getHeight();

  return (
    currentY + requiredHeight >
    pageHeight - bottomMargin
  );
}

/* ===========================================================
   Add New Page
=========================================================== */

export function addNewPage(doc) {
  doc.addPage();
  return 20;
}