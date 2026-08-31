import { useMemo, useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/feedback/EmptyState";

const SEVERITY_ORDER = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"];

const SEVERITY_TONES = {
  CRITICAL: "danger",
  HIGH: "danger",
  MEDIUM: "warning",
  LOW: "info",
  INFO: "neutral",
};

const CATEGORY_LABELS = {
  performance: "Performance",
  seo: "SEO",
  accessibility: "Accessibility",
  security: "Security",
  technical: "Technical",
};

export default function IssuesSection({ audit }) {
  const allIssues = useMemo(() => {
    if (audit?.issues?.length) return audit.issues;
    const buckets = [
      "performance",
      "seo",
      "accessibility",
      "security",
      "technical",
    ];
    return buckets.flatMap((k) => audit?.[k]?.issues || []);
  }, [audit]);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filtered = useMemo(() => {
    return allIssues
      .filter((i) =>
        categoryFilter === "all" ? true : i.category === categoryFilter,
      )
      .filter((i) =>
        severityFilter === "all" ? true : i.severity === severityFilter,
      )
      .sort(
        (a, b) =>
          SEVERITY_ORDER.indexOf(a.severity) -
          SEVERITY_ORDER.indexOf(b.severity),
      );
  }, [allIssues, categoryFilter, severityFilter]);

  const totals = useMemo(() => {
    const t = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0, INFO: 0 };
    for (const i of allIssues) t[i.severity] = (t[i.severity] || 0) + 1;
    return t;
  }, [allIssues]);

  return (
    <Card
      title="Issues & Recommendations"
      description="Grouped by severity. Fix critical items first."
      actions={
        <div className="flex flex-wrap gap-2">
          {Object.entries(totals).map(([sev, count]) =>
            count > 0 ? (
              <Badge key={sev} tone={SEVERITY_TONES[sev]}>
                {sev.toLowerCase()}: {count}
              </Badge>
            ) : null,
          )}
        </div>
      }
    >
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          className="input py-2 text-sm max-w-xs"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {Object.entries(CATEGORY_LABELS).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
        <select
          className="input py-2 text-sm max-w-xs"
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          aria-label="Filter by severity"
        >
          <option value="all">All severities</option>
          {SEVERITY_ORDER.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="✅"
          title="No issues found"
          description="Nothing to fix under the current filters."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((issue, idx) => (
            <li
              key={issue.id || `${issue.code}-${idx}`}
              className="border border-slate-200 rounded-xl p-4 bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={SEVERITY_TONES[issue.severity]}>
                      {issue.severity}
                    </Badge>
                    <Badge tone="neutral">
                      {CATEGORY_LABELS[issue.category] || issue.category}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">
                      {issue.code}
                    </span>
                  </div>
                  <h4 className="mt-2 font-medium text-slate-900">
                    {issue.title}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">
                    {issue.description}
                  </p>
                  {issue.recommendation && (
                    <p className="text-sm text-slate-700 mt-2">
                      <span className="font-medium">Recommendation: </span>
                      {issue.recommendation}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
