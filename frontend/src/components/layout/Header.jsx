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
    <header className="sticky top-0 z-20 flex h-24 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-primary)]/80 px-8 backdrop-blur-2xl">

      {/* Left Side */}
      <div>
        <p className="text-lg font-medium text-white">
          {greeting}, Admin 👋
        </p>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Welcome back to EvalGuard AI
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />

          <input
            type="text"
            placeholder="Search reports, evaluations..."
            className="
            w-80
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--bg-secondary)]
            py-3
            pl-11
            pr-4
            text-sm
            text-white
            outline-none
            transition-all
            duration-300
            placeholder:text-[var(--text-muted)]
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-500/20
            "
          />

        </div>

        {/* Run Evaluation */}

        <button
          className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-violet-600
          via-purple-600
          to-fuchsia-600
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          shadow-lg
          shadow-violet-600/30
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-xl
          hover:shadow-violet-600/40
          "
        >
          <Play size={16} />
          Run Evaluation
        </button>

        {/* Export */}

        <button
          className="
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--bg-secondary)]
          p-3
          text-[var(--text-secondary)]
          transition-all
          duration-300
          hover:border-violet-500/40
          hover:bg-white/5
          hover:text-white
          "
        >
          <Download size={18} />
        </button>

        {/* Notifications */}

        <button
          className="
          relative
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--bg-secondary)]
          p-3
          text-[var(--text-secondary)]
          transition-all
          duration-300
          hover:border-violet-500/40
          hover:bg-white/5
          hover:text-white
          "
        >
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[var(--bg-secondary)]"></span>
        </button>

        {/* Profile */}

        <div
          className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--bg-secondary)]
          px-3
          py-2
          transition-all
          duration-300
          hover:border-violet-500/30
          "
        >
          <UserCircle2
            size={40}
            className="text-violet-400"
          />

          <div>

            <p className="text-sm font-semibold text-white">
              Admin
            </p>

            <p className="text-xs text-[var(--text-secondary)]">
              AI Engineer
            </p>

          </div>

        </div>

      </div>
    </header>
  );
}