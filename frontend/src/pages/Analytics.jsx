import PageHeader from "../components/common/PageHeader";

export default function Analytics() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Analytics"
        subtitle="Analyze model performance, evaluation trends and system insights."
      />

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Analytics Dashboard
        </h2>

        <p className="mt-3 text-slate-400">
          Analytics charts and insights will appear here.
        </p>
      </div>
    </div>
  );
}