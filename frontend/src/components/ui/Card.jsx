import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              transition: {
                duration: 0.2,
              },
            }
          : undefined
      }
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--card-bg)]
        p-6
        shadow-lg
        shadow-black/20
        transition-all
        duration-300

        ${
          hover
            ? `
              hover:border-violet-500/30
              hover:shadow-2xl
              hover:shadow-violet-600/10
            `
            : ""
        }

        ${className}
      `}
    >
      {/* Ambient Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-violet-500/5
          blur-3xl
        "
      />

      {/* Subtle Grid */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.03]
          [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]
          [background-size:22px_22px]
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}