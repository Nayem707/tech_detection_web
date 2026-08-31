import { Link } from "react-router-dom";
import {
  useListAuditsQuery,
  useDeleteAuditMutation,
} from "../../features/audit/auditApi";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/feedback/EmptyState";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import { formatDateTime } from "../../utils/format";
import { scoreTone } from "../../features/audit/scoreUtils";

const STATUS_TONES = {
  COMPLETED: "success",
  FAILED: "danger",
  RUNNING: "info",
  PENDING: "neutral",
};

export default function AuditHistoryPage() {
  const { data, isLoading, isError, refetch } = useListAuditsQuery({
    page: 1,
    pageSize: 50,
  });
  const [deleteAudit, { isLoading: isDeleting }] = useDeleteAuditMutation();

  if (isLoading)
    return (
      <div className="py-24">
        <LoadingSpinner label="Loading history…" />
      </div>
    );
  if (isError) {
    return (
      <Card>
        <EmptyState
          icon="⚠️"
          title="Could not load audit history"
          description="Please check that the API server is reachable."
          action={
            <button className="btn btn-primary" onClick={refetch}>
              Retry
            </button>
          }
        />
      </Card>
    );
  }

  const items = data?.items || [];

  if (items.length === 0) {
    return (
      <Card>
        <EmptyState
          icon="📄"
          title="No audits yet"
          description="Run your first audit and it will appear here."
          action={
            <Link to="/" className="btn btn-primary">
              Run an audit
            </Link>
          }
        />
      </Card>
    );
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this audit? This cannot be undone.")) return;
    try {
      await deleteAudit(id).unwrap();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("Delete failed:", err);
    }
  }

  return (
    <Card
      title="Audit History"
      description={`${items.length} of ${data?.pagination?.total ?? items.length}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <th className="py-3 pr-4">Website</th>
              <th className="py-3 pr-4">Overall</th>
              <th className="py-3 pr-4">Perf</th>
              <th className="py-3 pr-4">SEO</th>
              <th className="py-3 pr-4">Sec</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id} className="border-b border-slate-100">
                <td className="py-3 pr-4 max-w-xs">
                  <Link
                    to={`/audit/${a.id}`}
                    className="text-slate-900 font-medium hover:underline block truncate"
                  >
                    {a.website?.domain || a.url}
                  </Link>
                  <p className="text-xs text-slate-500 truncate">{a.url}</p>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={scoreTone(a.scores?.overall)}>
                    {a.scores?.overall ?? "—"}
                  </Badge>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={scoreTone(a.scores?.performance)}>
                    {a.scores?.performance ?? "—"}
                  </Badge>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={scoreTone(a.scores?.seo)}>
                    {a.scores?.seo ?? "—"}
                  </Badge>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={scoreTone(a.scores?.security)}>
                    {a.scores?.security ?? "—"}
                  </Badge>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={STATUS_TONES[a.status] || "neutral"}>
                    {a.status}
                  </Badge>
                </td>
                <td className="py-3 pr-4 text-slate-500">
                  {formatDateTime(a.createdAt)}
                </td>
                <td className="py-3 pr-4 text-right">
                  <button
                    type="button"
                    className="text-xs text-rose-600 hover:underline disabled:opacity-50"
                    onClick={() => handleDelete(a.id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
