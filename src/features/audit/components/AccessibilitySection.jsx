import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

export default function AccessibilitySection({ accessibility }) {
  if (!accessibility) return null;
  const { counts = {}, passed = [] } = accessibility;

  const rows = [
    {
      label: "Images",
      value: counts.images,
      sub: `${counts.imagesMissingAlt || 0} missing alt`,
    },
    {
      label: "Form controls",
      value: counts.inputs,
      sub: `${counts.inputsMissingLabel || 0} missing label`,
    },
    { label: "Buttons w/o name", value: counts.buttonsMissingName || 0 },
    { label: "Empty links", value: counts.emptyLinks || 0 },
  ];

  return (
    <Card
      title="Accessibility"
      description="Automated heuristics. Not a substitute for a full WCAG audit."
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {rows.map((r) => (
          <div
            key={r.label}
            className="border border-slate-200 rounded-xl p-4 bg-white"
          >
            <p className="text-xs uppercase tracking-wider text-slate-500">
              {r.label}
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {r.value ?? "—"}
            </p>
            {r.sub && <p className="mt-1 text-xs text-slate-500">{r.sub}</p>}
          </div>
        ))}
      </div>

      {passed.length > 0 && (
        <div className="mt-6">
          <h4 className="section-title mb-2">Checks passed</h4>
          <ul className="flex flex-wrap gap-2">
            {passed.map((p) => (
              <li key={p.code}>
                <Badge tone="success">{p.title}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
