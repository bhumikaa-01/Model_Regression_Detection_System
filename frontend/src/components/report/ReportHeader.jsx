import {
  CalendarDays,
  Database,
  Bot,
  FileCode,
} from "lucide-react";

export default function ReportHeader({ report }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Report #{report.report_id}
          </h1>

          <p className="mt-2 text-slate-400">
            Evaluation details and regression analysis
          </p>
        </div>

        <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
          {report.current_accuracy.toFixed(2)}%
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-4">
          <Bot className="text-blue-400" size={22} />

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Model
            </p>

            <p className="mt-1 font-medium text-white">
              {report.model}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-4">
          <FileCode className="text-purple-400" size={22} />

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Prompt
            </p>

            <p className="mt-1 font-medium text-white">
              {report.prompt_version}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-4">
          <Database className="text-emerald-400" size={22} />

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Dataset
            </p>

            <p className="mt-1 font-medium text-white">
              {report.dataset_version}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-4">
          <CalendarDays className="text-orange-400" size={22} />

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Generated
            </p>

            <p className="mt-1 font-medium text-white">
              {new Date(report.timestamp).toLocaleString()}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}