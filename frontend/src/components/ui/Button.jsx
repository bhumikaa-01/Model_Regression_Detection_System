import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  leftIcon,
  rightIcon,
}) {
  const variants = {
    primary: `
      bg-gradient-to-r
      from-violet-600
      via-purple-600
      to-fuchsia-600
      text-white
      shadow-lg
      shadow-violet-600/25
      hover:shadow-xl
      hover:shadow-violet-600/35
    `,

    secondary: `
      border
      border-[var(--border)]
      bg-[var(--bg-secondary)]
      text-white
      hover:border-violet-500/30
      hover:bg-white/[0.03]
    `,

    outline: `
      border
      border-violet-500/40
      bg-transparent
      text-violet-300
      hover:bg-violet-500/10
    `,

    danger: `
      bg-gradient-to-r
      from-rose-600
      to-red-600
      text-white
      shadow-lg
      shadow-red-600/20
    `,

    ghost: `
      bg-transparent
      text-[var(--text-secondary)]
      hover:bg-white/5
      hover:text-white
    `,
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded-xl",
    md: "h-11 px-5 text-sm rounded-xl",
    lg: "h-12 px-6 text-base rounded-2xl",
  };

  return (
    <motion.button
      whileHover={
        disabled
          ? {}
          : {
              y: -2,
              scale: 1.01,
            }
      }
      whileTap={
        disabled
          ? {}
          : {
              scale: 0.98,
            }
      }
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        font-semibold
        transition-all
        duration-300
        focus:outline-none
        focus:ring-2
        focus:ring-violet-500
        focus:ring-offset-2
        focus:ring-offset-[var(--bg-primary)]

        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : ""
        }

        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {leftIcon && leftIcon}

      {children}

      {rightIcon && rightIcon}
    </motion.button>
  );
}