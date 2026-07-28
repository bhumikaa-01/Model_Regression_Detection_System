import {
  LayoutDashboard,
  BarChart3,
  FileText,
  PlayCircle,
  Activity,
  Settings,
  ShieldCheck,
  CircleDot,
  FolderKanban,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

const navigation = [
  {
    title: "MAIN",
    items: [
      {
        to: "/dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
      },
      {
        to: "/analytics",
        icon: BarChart3,
        label: "Analytics",
      },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      {
        to: "/projects",
        icon: FolderKanban,
        label: "Projects",
      },
      {
        to: "/evaluations",
        icon: PlayCircle,
        label: "Evaluations",
      },
      {
        to: "/reports",
        icon: FileText,
        label: "Reports",
      },
      {
        to: "/regression",
        icon: Activity,
        label: "Regression",
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        to: "/settings",
        icon: Settings,
        label: "Settings",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-[var(--border)] bg-[var(--sidebar-bg)]/95 backdrop-blur-2xl">

      {/* Logo */}
      <div className="border-b border-[var(--border)] px-6 py-6">
        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 shadow-xl shadow-violet-600/30">
            <ShieldCheck
              className="text-white"
              size={28}
            />
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-xl font-bold tracking-tight text-transparent">
              EvalGuard AI
            </h1>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Continuous Evaluation
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">

        {navigation.map((section) => (
          <div
            key={section.title}
            className="mb-8"
          >
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {section.title}
            </p>

            <div className="space-y-2">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        ))}

      </nav>

      {/* Backend Status */}

      <div className="mx-4 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-4 shadow-lg">

        <div className="flex items-center gap-3">

          <CircleDot
            size={12}
            className="fill-emerald-400 text-emerald-400"
          />

          <div>
            <p className="text-sm font-semibold text-emerald-300">
              Backend Connected
            </p>

            <p className="text-xs text-emerald-400">
              FastAPI Running
            </p>
          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-4 border-t border-[var(--border)] px-6 py-5">

        <div className="flex items-center justify-between text-xs">

          <span className="text-[var(--text-muted)]">
            Version 1.0.0
          </span>

          <span className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1 font-medium text-[var(--text-secondary)]">
            AI SaaS
          </span>

        </div>

      </div>

    </aside>
  );
}