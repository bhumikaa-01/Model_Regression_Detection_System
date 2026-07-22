import { useEffect, useState } from "react";

import ComparisonSelector from "../components/report/ComparisonSelector";
import ComparisonSummary from "../components/report/ComparisonSummary";
import ComparisonTable from "../components/report/ComparisonTable";

import {
  getAllReports,
  getReportById,
} from "../services/api";

export default function CompareReports() {
  const [reports, setReports] = useState([]);

  const [leftReportId, setLeftReportId] = useState("");
  const [rightReportId, setRightReportId] = useState("");

  const [leftReport, setLeftReport] = useState(null);
  const [rightReport, setRightReport] = useState(null);

  const [loading, setLoading] = useState(true);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    if (
      leftReportId &&
      rightReportId &&
      leftReportId !== rightReportId
    ) {
      loadComparison();
    }
  }, [leftReportId, rightReportId]);

  async function loadReports() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllReports();

      setReports(data);

      if (data.length >= 2) {
        setLeftReportId(String(data[0].report_id));
        setRightReportId(String(data[1].report_id));
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load reports.");
    } finally {
      setLoading(false);
    }
  }

  async function loadComparison() {
    try {
      setComparisonLoading(true);
      setError("");

      const [left, right] = await Promise.all([
        getReportById(leftReportId),
        getReportById(rightReportId),
      ]);

      setLeftReport(left);
      setRightReport(right);
    } catch (err) {
      console.error(err);
      setError("Unable to load comparison.");
    } finally {
      setComparisonLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-slate-400">
        Loading reports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Compare Reports
        </h1>

        <p className="mt-2 text-slate-400">
          Compare two evaluation runs to identify
          regressions, improvements, and deployment
          readiness.
        </p>
      </div>

      {/* Report Selector */}
      <ComparisonSelector
        reports={reports}
        leftReportId={leftReportId}
        rightReportId={rightReportId}
        onLeftChange={setLeftReportId}
        onRightChange={setRightReportId}
      />

      {/* Comparison */}
      {comparisonLoading ? (
        <div className="flex h-48 items-center justify-center text-slate-400">
          Loading comparison...
        </div>
      ) : (
        <>
          <ComparisonSummary
            leftReport={leftReport}
            rightReport={rightReport}
          />

          {leftReport && (
            <ComparisonTable report={leftReport} />
          )}
        </>
      )}
    </div>
  );
}