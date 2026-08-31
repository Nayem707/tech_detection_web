import { useState } from "react";
import { Globe } from "lucide-react";
import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";
import ScoreRing from "./ScoreRing";
import { formatDateTime, formatDurationMs } from "../../../utils/format";

function SiteIcon({ src }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-12 h-12 rounded-lg border border-slate-200 bg-slate-50 grid place-items-center text-slate-500">
        <Globe className="w-6 h-6" strokeWidth={1.8} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className="w-12 h-12 rounded-lg border border-slate-200 bg-white object-contain p-1"
      onError={() => setFailed(true)}
    />
  );
}

export default function OverviewSection({ audit }) {
  const overview = audit?.overview || {};
  const overall = audit?.scores?.overall;

  return (
    <Card>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <SiteIcon src={overview.favicon} />

          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold text-slate-900 truncate">
              {overview.title || overview.domain || audit.url}
            </h1>
            {overview.description && (
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                {overview.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <Badge tone={overview.https ? "success" : "danger"}>
                {overview.https ? "HTTPS" : "HTTP"}
              </Badge>
              <Badge
                tone={
                  overview.httpStatus >= 200 && overview.httpStatus < 400
                    ? "success"
                    : "danger"
                }
              >
                {overview.httpStatus ?? "—"}
              </Badge>
              <Badge tone="neutral">{overview.domain || "—"}</Badge>
              <Badge tone="neutral">
                {formatDurationMs(overview.responseTimeMs)}
              </Badge>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Audited {formatDateTime(audit.completedAt || audit.createdAt)}
              {audit.url && (
                <span>
                  {" "}
                  ·{" "}
                  <a
                    href={audit.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-slate-700"
                  >
                    {audit.url}
                  </a>
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <ScoreRing score={overall} label="Overall" size={112} />
        </div>
      </div>
    </Card>
  );
}
