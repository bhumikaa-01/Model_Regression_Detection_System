import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SidebarItem({ to, icon: Icon, label }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <motion.div
          whileHover={{
            x: 4,
            transition: { duration: 0.18 },
          }}
          whileTap={{ scale: 0.98 }}
          className={`group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-2xl border px-4 py-3 transition-all duration-300
          
          ${
            isActive
              ? "border-violet-500/40 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 text-white shadow-lg shadow-violet-600/20"
              : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border)] hover:bg-white/[0.03] hover:text-white"
          }`}
        >
          {/* Left Active Bar */}
          <span
            className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-b from-violet-400 to-fuchsia-400 opacity-100"
                : "opacity-0"
            }`}
          />

          {/* Glow */}
          {isActive && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-fuchsia-500/5 blur-xl" />
          )}

          <div className="relative z-10 flex items-center gap-3">
            <div
              className={`rounded-xl p-2 transition-all duration-300 ${
                isActive
                  ? "bg-white/10 shadow-lg shadow-violet-600/20"
                  : "bg-transparent group-hover:bg-white/5"
              }`}
            >
              <Icon
                size={18}
                className={`transition-all duration-300 ${
                  isActive
                    ? "text-violet-200"
                    : "text-[var(--text-secondary)] group-hover:text-white"
                }`}
              />
            </div>

            <span
              className={`font-medium tracking-wide transition-all duration-300 ${
                isActive ? "text-white" : ""
              }`}
            >
              {label}
            </span>
          </div>

          <ChevronRight
            size={16}
            className={`relative z-10 transition-all duration-300 ${
              isActive
                ? "translate-x-0 text-violet-300 opacity-100"
                : "translate-x-2 text-[var(--text-muted)] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            }`}
          />
        </motion.div>
      )}
    </NavLink>
  );
}