import { useSelector } from "react-redux";
import AuditForm from "../../features/audit/components/AuditForm";
import AuditProgress from "../../features/audit/components/AuditProgress";
import { selectSubmittedUrl } from "../../features/audit/auditSelectors";

export default function HomePage() {
  const submittedUrl = useSelector(selectSubmittedUrl);

  if (submittedUrl) {
    return <AuditProgress />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Understand any website in seconds
        </h1>
        <p className="mt-3 text-slate-600 max-w-xl mx-auto">
          Enter a URL and we&apos;ll analyze technologies, SEO, performance,
          accessibility, and security — with clear recommendations.
        </p>
      </div>

      <div className="card p-6 md:p-8">
        <AuditForm />
      </div>

      <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm text-slate-600">
        <Feature
          title="Technology detection"
          description="Heuristic fingerprints with clear confidence scores."
        />
        <Feature
          title="Actionable issues"
          description="Every finding includes a recommendation and severity."
        />
        <Feature
          title="SSRF-safe by design"
          description="Private networks and metadata endpoints are always blocked."
        />
      </div>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="card p-4">
      <p className="font-medium text-slate-900">{title}</p>
      <p className="mt-1">{description}</p>
    </div>
  );
}
