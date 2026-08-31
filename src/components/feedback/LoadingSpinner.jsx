export default function LoadingSpinner({ label = "Loading…", className = "" }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-slate-500 ${className}`}
    >
      <span
        className="inline-block w-4 h-4 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin"
        aria-hidden
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
