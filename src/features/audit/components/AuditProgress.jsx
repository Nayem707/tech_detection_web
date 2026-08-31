import { Activity } from "lucide-react";
import { useSelector } from "react-redux";
import { selectSubmittedUrl } from "../auditSelectors";

const STEPS = [
  { key: "connect", label: "Connecting" },
  { key: "fetch", label: "Fetching website" },
  { key: "tech", label: "Detecting technologies" },
  { key: "seo", label: "Analyzing SEO" },
  { key: "perf", label: "Checking performance" },
  { key: "sec", label: "Checking security" },
  { key: "report", label: "Generating report" },
];

export default function AuditProgress() {
  const url = useSelector(selectSubmittedUrl);
  return (
    <div className="card p-8 max-w-xl mx-auto">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
        <Activity className="h-5 w-5" strokeWidth={2} />
        Analyzing website…
      </h2>
      {url && <p className="text-sm text-slate-500 mt-1 truncate">{url}</p>}
      <ul className="mt-6 space-y-3">
        {STEPS.map((s) => (
          <li
            key={s.key}
            className="flex items-center gap-3 text-sm text-slate-700"
          >
            <span
              className="inline-block w-4 h-4 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin"
              aria-hidden
            />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
