import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No Data",
  description = "Nothing to display.",
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-20">
      <Inbox
        size={48}
        className="text-slate-500"
      />

      <h3 className="mt-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-slate-400">
        {description}
      </p>
    </div>
  );
}