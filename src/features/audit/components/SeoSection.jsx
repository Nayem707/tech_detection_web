import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

function Row({ label, value, tone = "neutral" }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-slate-100 last:border-b-0">
      <span className="text-sm text-slate-600">{label}</span>
      {typeof value === "string" || typeof value === "number" ? (
        <Badge tone={tone}>{value}</Badge>
      ) : (
        value
      )}
    </div>
  );
}

export default function SeoSection({ seo }) {
  if (!seo) return null;
  const { meta = {}, headings = {}, images = {}, links = {} } = seo;

  return (
    <Card
      title="SEO"
      description="Structured metadata and page content signals."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="section-title mb-2">Meta</h4>
          <Row
            label="Title"
            value={meta.title ? `${meta.titleLength} chars` : "Missing"}
            tone={meta.title ? "success" : "danger"}
          />
          <Row
            label="Description"
            value={
              meta.metaDescription
                ? `${meta.metaDescriptionLength} chars`
                : "Missing"
            }
            tone={meta.metaDescription ? "success" : "warning"}
          />
          <Row
            label="Canonical"
            value={meta.canonical ? "Present" : "Missing"}
            tone={meta.canonical ? "success" : "warning"}
          />
          <Row
            label="Robots meta"
            value={meta.robotsMeta || "default"}
            tone={
              String(meta.robotsMeta || "").includes("noindex")
                ? "danger"
                : "neutral"
            }
          />
          <Row
            label="Language"
            value={meta.lang || "Not set"}
            tone={meta.lang ? "success" : "warning"}
          />
          <Row
            label="Viewport"
            value={meta.viewport ? "Present" : "Missing"}
            tone={meta.viewport ? "success" : "warning"}
          />
        </div>

        <div>
          <h4 className="section-title mb-2">Social & Structure</h4>
          <Row
            label="Open Graph"
            value={
              meta.openGraph?.title &&
              meta.openGraph?.description &&
              meta.openGraph?.image
                ? "Complete"
                : "Incomplete"
            }
            tone={
              meta.openGraph?.title &&
              meta.openGraph?.description &&
              meta.openGraph?.image
                ? "success"
                : "warning"
            }
          />
          <Row
            label="Twitter card"
            value={meta.twitterCard || "Missing"}
            tone={meta.twitterCard ? "success" : "neutral"}
          />
          <Row
            label="H1 count"
            value={headings.h1Count ?? 0}
            tone={headings.h1Count === 1 ? "success" : "warning"}
          />
          <Row
            label="Heading hierarchy"
            value={headings.hierarchyOk ? "OK" : "Skipped levels"}
            tone={headings.hierarchyOk ? "success" : "warning"}
          />
          <Row
            label="Images missing alt"
            value={`${images.missingAlt ?? 0} / ${images.total ?? 0}`}
            tone={images.missingAlt ? "warning" : "success"}
          />
          <Row
            label="Links (internal / external)"
            value={`${links.internal ?? 0} / ${links.external ?? 0}`}
          />
        </div>
      </div>
    </Card>
  );
}
