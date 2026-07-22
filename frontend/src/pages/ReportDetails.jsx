import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getReportById } from "../services/api";

import ReportHeader from "../components/report/ReportHeader";
import ReportMetrics from "../components/report/ReportMetrics";
import ReportSummary from "../components/report/ReportSummary";
import ComparisonTable from "../components/report/ComparisonTable";

export default function ReportDetails() {
  const { reportId } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReport();
  }, [reportId]);

  const loadReport = async () => {
    try {
      setLoading(true);

      const data = await getReportById(reportId);

      setReport(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load report.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-lg text-slate-400">
          Loading report...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      <ReportHeader report={report} />

      <ReportMetrics report={report} />

      <ReportSummary report={report} />

      <ComparisonTable report={report} />

    </div>
  );
}