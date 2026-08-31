const TONE_CLASSES = {
  neutral: "bg-slate-100 text-slate-700 border border-slate-200",
  info: "bg-sky-50 text-sky-700 border border-sky-200",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border border-amber-200",
  danger: "bg-rose-50 text-rose-700 border border-rose-200",
  brand: "bg-slate-900 text-white border border-slate-900",
};

export default function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span
      className={`badge ${TONE_CLASSES[tone] || TONE_CLASSES.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
