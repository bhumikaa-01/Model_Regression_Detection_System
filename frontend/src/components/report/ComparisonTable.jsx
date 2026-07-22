import { useMemo, useState } from "react";

export default function ComparisonTable({ report }) {
  const [activeTab, setActiveTab] = useState("regressions");

  const tabs = useMemo(
    () => ({
      regressions: report.regressions,
      improvements: report.improvements,
      unchanged_passes: report.unchanged_passes,
      still_failing: report.still_failing,
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
      return "bg-red-500/10 text-red-400";

    if (value.includes("improvement"))
      return "bg-emerald-500/10 text-emerald-400";

    if (value.includes("pass"))
      return "bg-blue-500/10 text-blue-400";

    return "bg-orange-500/10 text-orange-400";
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900">

      {/* Tabs */}

      <div className="flex flex-wrap gap-3 border-b border-slate-800 p-5">

        {Object.keys(tabLabels).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {tabLabels[tab]} ({tabs[tab].length})
          </button>
        ))}

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b border-slate-800">

            <tr className="text-left text-sm text-slate-400">

              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Expected</th>
              <th className="px-6 py-4">Previous</th>
              <th className="px-6 py-4">Current</th>
              <th className="px-6 py-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {currentData.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-slate-500"
                >
                  No records found.
                </td>

              </tr>

            ) : (

              currentData.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-800 transition hover:bg-slate-800/50"
                >

                  <td className="px-6 py-4 font-medium text-white">
                    {item.id}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {item.expected}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {item.previous_prediction ?? "-"}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {item.current_prediction ?? "-"}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
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