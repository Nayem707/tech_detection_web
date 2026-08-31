import { Link, useParams } from "react-router-dom";
import { useGetAuditQuery } from "../../features/audit/auditApi";
import OverviewSection from "../../features/audit/components/OverviewSection";
import ScoreGrid from "../../features/audit/components/ScoreGrid";
import TechnologySection from "../../features/audit/components/TechnologySection";
import PerformanceSection from "../../features/audit/components/PerformanceSection";
import SeoSection from "../../features/audit/components/SeoSection";
import SecuritySection from "../../features/audit/components/SecuritySection";
import AccessibilitySection from "../../features/audit/components/AccessibilitySection";
import IssuesSection from "../../features/audit/components/IssuesSection";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import ErrorState from "../../components/feedback/ErrorState";

export default function AuditPage() {
  const { id } = useParams();
  const {
    data: audit,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAuditQuery(id);

  if (isLoading) {
    return (
      <div className="py-24">
        <LoadingSpinner label="Loading audit…" />
      </div>
    );
  }

  if (isError || !audit) {
    return (
      <ErrorState
        message={error?.data?.message || "We could not load this audit."}
        action={
          <div className="flex items-center gap-3 justify-center">
            <button className="btn btn-primary" onClick={refetch}>
              Retry
            </button>
            <Link to="/" className="btn btn-ghost">
              Start over
            </Link>
          </div>
        }
      />
    );
  }

  if (audit.status === "FAILED") {
    return (
      <ErrorState
        title="Audit failed"
        message={audit.errorMessage || "The audit could not be completed."}
        action={
          <Link to="/" className="btn btn-primary">
            Run a new audit
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <OverviewSection audit={audit} />
      <ScoreGrid scores={audit.scores} />
      <TechnologySection technologies={audit.technologies} />
      <PerformanceSection performance={audit.performance} />
      <SeoSection seo={audit.seo} />
      <AccessibilitySection accessibility={audit.accessibility} />
      <SecuritySection security={audit.security} />
      <IssuesSection audit={audit} />
    </div>
  );
}
