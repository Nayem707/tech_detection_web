export default function EmptyState({
  title,
  description,
  icon = "📭",
  action,
}) {
  return (
    <div className="text-center py-16 px-6">
      <div className="text-4xl mb-3" aria-hidden>
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
