import { Inbox } from "lucide-react";

export default function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
}) {
  return (
    <div className="text-center py-16 px-6">
      <div className="mb-4 flex justify-center" aria-hidden>
        <div className="rounded-full bg-slate-100 p-3 text-slate-600">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </div>
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
