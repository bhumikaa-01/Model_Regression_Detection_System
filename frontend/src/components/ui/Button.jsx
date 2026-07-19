export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
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
      className={`
        rounded-xl
        px-5
        py-3
        text-sm
        font-semibold
        transition-all
        duration-300
        hover:-translate-y-0.5
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}