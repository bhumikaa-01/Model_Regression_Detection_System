import Card from "../ui/Card";

const reports = [
  {
    id: "EV-001",
    accuracy: "98.4%",
    health: "Healthy",
  },
  {
    id: "EV-002",
    accuracy: "97.8%",
    health: "Healthy",
  },
  {
    id: "EV-003",
    accuracy: "96.9%",
    health: "Warning",
  },
];

export default function RecentReports() {
  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Recent Reports
        </h2>

        <button className="text-sm text-blue-400 hover:text-blue-300">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between rounded-lg border border-slate-800 p-4"
          >
            <div>
              <h3 className="font-medium text-white">
                {report.id}
              </h3>

              <p className="text-sm text-slate-400">
                Accuracy: {report.accuracy}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                report.health === "Healthy"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {report.health}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}