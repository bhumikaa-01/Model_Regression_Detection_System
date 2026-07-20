import {
  LayoutDashboard,
  BarChart3,
  FileText,
  PlayCircle,
  Activity,
  Settings,
  ShieldCheck,
  CircleDot,
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
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
            <ShieldCheck className="text-white" size={28} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              EvalGuard AI
            </h1>

            <p className="mt-1 text-xs text-slate-400">
              Continuous Evaluation
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {navigation.map((section) => (
          <div key={section.title} className="mb-8">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
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
      <div className="mx-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
        <div className="flex items-center gap-3">
          <CircleDot
            size={12}
            className="fill-emerald-400 text-emerald-400"
          />

          <div>
            <p className="text-sm font-medium text-emerald-300">
              Backend Connected
            </p>

            <p className="text-xs text-emerald-500">
              FastAPI Running
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 border-t border-slate-800 px-6 py-5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Version 1.0.0
          </span>

          <span className="rounded-full border border-slate-700 px-2 py-1 text-slate-400">
            AI SaaS
          </span>
        </div>
      </div>
    </aside>
  );
}