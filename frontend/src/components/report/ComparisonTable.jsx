import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MinusCircle,
} from "lucide-react";

export default function ComparisonTable({ report }) {
  const [activeTab, setActiveTab] = useState("regressions");

  const tabs = useMemo(
    () => ({
      regressions: report.regressions ?? [],
      improvements: report.improvements ?? [],
      unchanged_passes: report.unchanged_passes ?? [],
      still_failing: report.still_failing ?? [],
    }),
    [report]
  );

  const tabLabels = {
    regressions: "Regressions",
    improvements: "Improvements",
    unchanged_passes: "Still Passing",
    still_failing: "Still Failing",
  };

  const currentData = tabs[activeTab];

  const getStatusColor = (status) => {
    const value = status.toLowerCase();

    if (value.includes("regression"))
      return "bg-red-500/10 text-red-400 border border-red-500/20";

    if (value.includes("improvement"))
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";

    if (value.includes("pass"))
      return "bg-blue-500/10 text-blue-400 border border-blue-500/20";

    return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
  };

  const renderPrediction = (prediction, correct) => {
    return (
      <div className="flex items-center gap-2">
        {correct ? (
          <CheckCircle2
            size={16}
            className="text-emerald-400"
          />
        ) : (
          <XCircle
            size={16}
            className="text-red-400"
          />
        )}

        <span
          className="max-w-xs truncate text-slate-300"
          title={prediction || "-"}
        >
          {prediction || "-"}
        </span>
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">

      {/* Tabs */}

      <div className="flex flex-wrap gap-3 border-b border-slate-800 p-5">

        {Object.keys(tabLabels).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {tabLabels[tab]} ({tabs[tab].length})
          </button>
        ))}
      </div>

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

        <h3 className="text-lg font-semibold text-white">
          {tabLabels[activeTab]}
        </h3>

        <span className="text-sm text-slate-400">
          {currentData.length} record
          {currentData.length !== 1 ? "s" : ""}
        </span>

      </div>

      {/* Table */}

      <div className="max-h-[550px] overflow-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-slate-900 border-b border-slate-800">

            <tr className="text-left text-sm text-slate-400">

              <th className="px-6 py-4">#</th>

              <th className="px-6 py-4">ID</th>

              <th className="px-6 py-4">Expected</th>

              <th className="px-6 py-4">
                Previous Prediction
              </th>

              <th className="px-6 py-4">
                Current Prediction
              </th>

              <th className="px-6 py-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {currentData.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-16 text-center"
                >

                  <div className="flex flex-col items-center gap-3">

                    <MinusCircle
                      size={40}
                      className="text-slate-500"
                    />

                    <p className="text-slate-400">
                      No {tabLabels[
                        activeTab
                      ].toLowerCase()} found.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              currentData.map((item, index) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-800 transition hover:bg-slate-800/40"
                >

                  <td className="px-6 py-4 text-slate-500">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-mono text-white">
                    {item.id}
                  </td>

                  <td
                    className="max-w-xs truncate px-6 py-4 text-slate-300"
                    title={item.expected}
                  >
                    {item.expected}
                  </td>

                  <td className="px-6 py-4">
                    {renderPrediction(
                      item.previous_prediction,
                      item.previous_correct
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {renderPrediction(
                      item.current_prediction,
                      item.current_correct
                    )}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}