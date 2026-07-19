import {
  LayoutDashboard,
  BarChart3,
  FileText,
  PlayCircle,
  Activity,
  Settings,
  ShieldCheck,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
            <ShieldCheck size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              EvalGuard AI
            </h1>

            <p className="text-xs text-slate-400">
              Continuous Evaluation
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <SidebarItem
          to="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
        />

        <SidebarItem
          to="/analytics"
          icon={BarChart3}
          label="Analytics"
        />

        <SidebarItem
          to="/reports"
          icon={FileText}
          label="Reports"
        />

        <SidebarItem
          to="/evaluations"
          icon={PlayCircle}
          label="Evaluations"
        />

        <SidebarItem
          to="/regression"
          icon={Activity}
          label="Regression"
        />

        <SidebarItem
          to="/settings"
          icon={Settings}
          label="Settings"
        />
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-6">
        <p className="text-xs text-slate-500">
          Version 1.0.0
        </p>
      </div>
    </aside>
  );
}