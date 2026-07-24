import { useRef, useState, useEffect } from "react";
import {
  Download,
  FileText,
  Table2,
  ChevronDown,
} from "lucide-react";

import { generatePDFReport } from "../../utils/pdf/pdfReportGenerator";

export default function ExportMenu({ report }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  /* ==========================
     CSV Export
  ========================== */

  const exportCSV = () => {
    if (!report) return;

    const rows = [
      ["Metric", "Value"],
      ["Report ID", report.report_id],
      ["Model", report.model],
      ["Prompt", report.prompt_name],
      ["Prompt Version", report.prompt_version],
      ["Dataset", report.dataset_name],
      ["Dataset Version", report.dataset_version],
      ["Timestamp", report.timestamp],
      ["Accuracy", report.current_accuracy],
      ["Execution Time", report.execution_time_seconds],
      ["Health Status", report.health_status],
      [
        "Deployment Recommendation",
        report.deployment_recommendation,
      ],
      [
        "Regressions",
        report.regressions.length,
      ],
      [
        "Improvements",
        report.improvements.length,
      ],
      [
        "Still Passing",
        report.unchanged_passes.length,
      ],
      [
        "Still Failing",
        report.still_failing.length,
      ],
    ];

    const csv = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `report-${report.report_id}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setOpen(false);
  };

  /* ==========================
     PDF Export
  ========================== */

  const exportPDF = () => {
    if (!report) return;

    try {
      generatePDFReport(report);
    } catch (error) {
      console.error("PDF Generation Error:", error);

      alert(
        "Failed to generate PDF. Please check the browser console."
      );
    }

    setOpen(false);
  };

  return (
    <div
      className="relative"
      ref={menuRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:border-blue-500 hover:bg-slate-800"
      >
        <Download size={18} />

        Export

        <ChevronDown
          size={16}
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
          <button
            onClick={exportPDF}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800"
          >
            <FileText size={18} />

            Export as PDF
          </button>

          <button
            onClick={exportCSV}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800"
          >
            <Table2 size={18} />

            Export as CSV
          </button>
        </div>
      )}
    </div>
  );
}