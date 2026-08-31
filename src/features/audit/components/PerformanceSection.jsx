import Card from "../../../components/ui/Card";
import { formatBytes, formatDurationMs } from "../../../utils/format";

function Metric({ label, value, hint }) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white">
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

function readMetric(metrics, key) {
  const m = metrics?.[key];
  if (!m) return { available: false, value: null };
  return { available: !!m.available, value: m.value };
}

export default function PerformanceSection({ performance }) {
  if (!performance) return null;
  const { metrics = {}, transport = {} } = performance;

  const ttfb = readMetric(metrics, "ttfbMs");
  const total = readMetric(metrics, "totalResponseMs");
  const html = readMetric(metrics, "htmlBytes");
  const scripts = readMetric(metrics, "externalScripts");
  const styles = readMetric(metrics, "externalStylesheets");
  const images = readMetric(metrics, "images");
  const totalResources = readMetric(metrics, "totalResources");
  const lcp = readMetric(metrics, "lcpMs");

  return (
    <Card
      title="Performance"
      description="Static HTTP measurements — deep browser metrics (LCP/FCP/CLS) will be added in Phase 3."
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Metric
          label="TTFB"
          value={ttfb.available ? formatDurationMs(ttfb.value) : "N/A"}
        />
        <Metric
          label="Total response"
          value={total.available ? formatDurationMs(total.value) : "N/A"}
        />
        <Metric
          label="HTML size"
          value={html.available ? formatBytes(html.value) : "N/A"}
        />
        <Metric
          label="Total resources"
          value={totalResources.available ? totalResources.value : "N/A"}
        />
        <Metric
          label="External scripts"
          value={scripts.available ? scripts.value : "N/A"}
        />
        <Metric
          label="External stylesheets"
          value={styles.available ? styles.value : "N/A"}
        />
        <Metric
          label="Images"
          value={images.available ? images.value : "N/A"}
        />
        <Metric
          label="LCP"
          value={lcp.available ? formatDurationMs(lcp.value) : "N/A"}
          hint={lcp.available ? undefined : "Requires browser measurement"}
        />
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Compression
          </p>
          <p className="mt-1 text-slate-900">
            {transport.compressed ? `Yes (${transport.contentEncoding})` : "No"}
          </p>
        </div>
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Cache-Control
          </p>
          <p className="mt-1 text-slate-900 break-words">
            {transport.cacheControl || "—"}
          </p>
        </div>
      </div>
    </Card>
  );
}
