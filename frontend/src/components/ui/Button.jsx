export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",

    secondary:
      "bg-slate-800 hover:bg-slate-700 text-white",

    outline:
      "border border-slate-700 bg-transparent hover:bg-slate-800 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        px-5
        py-3
        text-sm
        font-semibold
        transition-all
        duration-300
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        focus:ring-offset-slate-950
        ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "hover:-translate-y-0.5"
        }
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}