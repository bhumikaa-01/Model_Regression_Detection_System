import {
  Bell,
  Search,
  UserCircle2,
  Play,
  Download,
} from "lucide-react";

export default function Header() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="sticky top-0 z-20 flex h-24 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-8 backdrop-blur-xl">
      {/* Left Side */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Dashboard
        </h1>

        <p className="text-sm text-slate-400">
          {greeting}, Admin 👋 Welcome back to EvalGuard AI
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search reports, evaluations..."
            className="w-80 rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Run Evaluation */}
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:scale-105">
          <Play size={16} />
          Run Evaluation
        </button>

        {/* Export */}
        <button className="rounded-xl border border-slate-700 p-3 text-slate-400 transition hover:border-slate-600 hover:bg-slate-900 hover:text-white">
          <Download size={18} />
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl border border-slate-700 p-3 text-slate-400 transition hover:border-slate-600 hover:bg-slate-900 hover:text-white">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-slate-950"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
          <UserCircle2
            size={40}
            className="text-blue-400"
          />

          <div>
            <p className="text-sm font-semibold text-white">
              Admin
            </p>

            <p className="text-xs text-slate-400">
              AI Engineer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}