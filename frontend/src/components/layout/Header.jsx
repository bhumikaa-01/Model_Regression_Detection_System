import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-8 backdrop-blur-md">
      {/* Search */}

      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-blue-500"
        />
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-6">
        <button className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">
          <Bell size={22} />
        </button>

        <div className="flex items-center gap-3">
          <UserCircle2
            size={36}
            className="text-slate-400"
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