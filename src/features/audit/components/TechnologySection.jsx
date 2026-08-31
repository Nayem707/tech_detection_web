import { useState } from "react";
import { Puzzle } from "lucide-react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/feedback/EmptyState";

// Preferred display order for known categories. Anything not listed sorts
// alphabetically after these. Configuration-driven — no per-category components.
const CATEGORY_ORDER = [
  "JavaScript Frameworks",
  "Web Frameworks",
  "UI Frameworks",
  "CSS Frameworks",
  "JavaScript Libraries",
  "CMS",
  "Ecommerce",
  "Website Builders",
  "Static Site Generators",
  "Backend Technologies",
  "Databases",
  "Authentication",
  "CDN",
  "Hosting",
  "Cloud Platforms",
  "Web Servers",
  "Analytics",
  "Tag Managers",
  "Advertising",
  "Marketing Automation",
  "Payment Processors",
  "Maps",
  "Geolocation",
  "Digital Asset Management",
  "Image Processing",
  "Video",
  "Font Scripts",
  "Search",
  "Chat",
  "Customer Support",
  "Email",
  "Monitoring",
  "Error Tracking",
  "Security",
  "Performance",
  "Other",
];

function primaryCategory(t) {
  if (Array.isArray(t.categories) && t.categories.length)
    return t.categories[0];
  return t.category || "Other";
}

function groupByCategory(techs) {
  const groups = {};
  for (const t of techs) {
    (groups[primaryCategory(t)] ||= []).push(t);
  }
  const orderIndex = new Map(CATEGORY_ORDER.map((c, i) => [c, i]));
  return Object.entries(groups).sort(([a], [b]) => {
    const ia = orderIndex.has(a) ? orderIndex.get(a) : Number.MAX_SAFE_INTEGER;
    const ib = orderIndex.has(b) ? orderIndex.get(b) : Number.MAX_SAFE_INTEGER;
    return ia - ib || a.localeCompare(b);
  });
}

function iconUrlFor(website) {
  if (!website) return null;
  try {
    const host = new URL(website).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
  } catch {
    return null;
  }
}

// Deterministic palette for the initials fallback.
const FALLBACK_COLORS = [
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-800",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
  "bg-slate-100 text-slate-700",
  "bg-indigo-100 text-indigo-700",
  "bg-teal-100 text-teal-700",
];

function paletteFor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1)
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

function TechIcon({ src, name }) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    const letter = (name || "?").charAt(0).toUpperCase();
    return (
      <span
        aria-hidden
        className={`shrink-0 w-8 h-8 rounded-full grid place-items-center text-xs font-semibold ${paletteFor(
          name || "",
        )}`}
      >
        {letter}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      aria-hidden
      onError={() => setFailed(true)}
      className="shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 object-contain p-1"
    />
  );
}

function TechRow({ tech }) {
  const percent = Math.round(tech.confidence * 100);
  const iconSrc = iconUrlFor(tech.website);
  const NameTag = tech.website ? "a" : "span";
  const nameProps = tech.website
    ? { href: tech.website, target: "_blank", rel: "noreferrer noopener" }
    : {};
  const evidenceTitle =
    tech.evidence?.length > 0
      ? `${percent}% confidence · ${
          tech.signalCount ?? tech.evidence.length
        } signal(s)\n\n${tech.evidence.slice(0, 6).join("\n")}`
      : `${percent}% confidence`;

  return (
    <li className="flex items-center gap-3 py-2" title={evidenceTitle}>
      <TechIcon src={iconSrc} name={tech.name} />
      <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
        <NameTag
          {...nameProps}
          className={`text-sm font-medium text-slate-900 truncate ${
            tech.website ? "hover:underline" : ""
          }`}
        >
          {tech.name}
        </NameTag>
        {tech.version && (
          <span className="text-xs font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">
            {tech.version}
          </span>
        )}
        {tech.implied && (
          <span className="text-[10px] uppercase tracking-wider text-slate-400">
            implied
          </span>
        )}
      </div>
      <span className="text-xs text-slate-400 tabular-nums shrink-0">
        {percent}%
      </span>
    </li>
  );
}

export default function TechnologySection({ technologies = [] }) {
  if (!technologies.length) {
    return (
      <Card title="Technology Stack">
        <EmptyState
          icon={Puzzle}
          title="No technologies detected"
          description="Heuristic fingerprints did not find a confident match on this page."
        />
      </Card>
    );
  }

  const groups = groupByCategory(technologies);
  const totalCount = technologies.length;

  return (
    <Card
      title="Technology Stack"
      description="Detected using evidence-based fingerprints. Hover a row to see confidence and evidence."
      actions={<Badge tone="neutral">{totalCount} detected</Badge>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {groups.map(([category, items]) => (
          <div key={category}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">
              {category}
            </h4>
            <ul className="divide-y divide-slate-100">
              {items.map((t) => (
                <TechRow key={t.slug || `${category}-${t.name}`} tech={t} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}
