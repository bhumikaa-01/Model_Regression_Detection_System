import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function SidebarItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative flex items-center justify-between overflow-hidden rounded-xl px-4 py-3 transition-all duration-300
        ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20"
            : "text-slate-400 hover:bg-slate-900 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator */}
          {isActive && (
            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
          )}

          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg p-2 transition-all duration-300 ${
                isActive
                  ? "bg-white/10"
                  : "group-hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
            </div>

            <span className="font-medium">{label}</span>
          </div>

          <ChevronRight
            size={16}
            className={`transition-all duration-300 ${
              isActive
                ? "translate-x-0 opacity-100"
                : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            }`}
          />
        </>
      )}
    </NavLink>
  );
}