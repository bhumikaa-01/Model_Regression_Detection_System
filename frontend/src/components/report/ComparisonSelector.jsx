import { GitCompareArrows } from "lucide-react";

import Card from "../ui/Card";

export default function ComparisonSelector({
  reports = [],
  leftReportId,
  rightReportId,
  onLeftChange,
  onRightChange,
}) {
  return (
    <Card className="mb-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {/* Left Report */}
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Report A
          </label>

          <select
            value={leftReportId}
            onChange={(e) => onLeftChange(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          >
            <option value="">Select Report</option>

            {reports.map((report) => (
              <option
                key={report.report_id}
                value={report.report_id}
              >
                Report #{report.report_id}
              </option>
            ))}
          </select>
        </div>

        {/* Compare Icon */}
        <div className="flex justify-center">
          <div className="rounded-full border border-slate-700 bg-slate-900 p-3">
            <GitCompareArrows
              size={22}
              className="text-blue-400"
            />
          </div>
        </div>

        {/* Right Report */}
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Report B
          </label>

          <select
            value={rightReportId}
            onChange={(e) => onRightChange(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          >
            <option value="">Select Report</option>

            {reports
              .filter(
                (report) =>
                  String(report.report_id) !== String(leftReportId)
              )
              .map((report) => (
                <option
                  key={report.report_id}
                  value={report.report_id}
                >
                  Report #{report.report_id}
                </option>
              ))}
          </select>
        </div>
      </div>
    </Card>
  );
}